import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api.sandbox.paypal.com';

// Funzione per ottenere l'access token PayPal
async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { planId, amount, currency } = await request.json();

    // Validazione input
    if (!planId || !amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: planId, amount, currency' },
        { status: 400 }
      );
    }

    // Validazione piano
    const validPlans = ['starter', 'professional', 'enterprise'];
    if (!validPlans.includes(planId)) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      );
    }

    // Validazione importi per sicurezza
    const planPrices: Record<string, string> = {
      'starter': '299.00',
      'professional': '599.00',
      'enterprise': '999.00'
    };

    if (planPrices[planId] !== `${amount}.00`) {
      return NextResponse.json(
        { error: 'Invalid amount for selected plan' },
        { status: 400 }
      );
    }

    // Ottieni access token
    const accessToken = await getPayPalAccessToken();

    // Crea l'ordine PayPal
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: `HIPEG_${planId.toUpperCase()}_${Date.now()}`,
          description: `Piano HipeG ${planId.charAt(0).toUpperCase() + planId.slice(1)} - Comunicazione Digitale`,
          custom_id: planId,
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
      application_context: {
        brand_name: 'HipeG Creative Company',
        landing_page: 'NO_PREFERENCE',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/cancel`,
      },
    };

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `HIPEG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal order creation failed:', errorData);
      throw new Error('Failed to create PayPal order');
    }

    const order = await response.json();

    // Log per debugging (rimuovi in produzione)
    console.log('PayPal order created successfully:', {
      orderId: order.id,
      planId,
      amount,
      status: order.status
    });

    return NextResponse.json({
      id: order.id,
      status: order.status,
      links: order.links
    });

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}