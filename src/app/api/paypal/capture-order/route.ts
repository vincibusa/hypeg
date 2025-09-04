import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

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
    const { orderID } = await request.json();

    // Validazione input
    if (!orderID) {
      return NextResponse.json(
        { error: 'Missing orderID' },
        { status: 400 }
      );
    }

    // Ottieni access token
    const accessToken = await getPayPalAccessToken();

    // Cattura il pagamento
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `HIPEG_CAPTURE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        'Prefer': 'return=representation'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error('PayPal capture failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`PayPal capture failed: ${response.status} ${response.statusText}`);
    }

    const captureData = await response.json();

    // Verifica che il pagamento sia stato completato con successo
    const captureStatus = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.status;
    const paymentAmount = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount;
    const customId = captureData.purchase_units?.[0]?.custom_id;

    if (captureStatus !== 'COMPLETED') {
      console.error('Payment not completed:', captureData);
      throw new Error('Payment was not completed successfully');
    }

    // Log del pagamento riuscito (in produzione potresti salvare su database)
    console.log('Payment completed successfully:', {
      orderId: orderID,
      captureId: captureData.purchase_units[0].payments.captures[0].id,
      planId: customId,
      amount: paymentAmount,
      payerEmail: captureData.payer?.email_address,
      payerName: `${captureData.payer?.name?.given_name} ${captureData.payer?.name?.surname}`,
      timestamp: new Date().toISOString()
    });

    // Qui potresti:
    // 1. Salvare la transazione nel database
    // 2. Inviare email di conferma
    // 3. Attivare il servizio per il cliente
    // 4. Integrare con sistemi di billing

    return NextResponse.json({
      success: true,
      orderID,
      captureID: captureData.purchase_units[0].payments.captures[0].id,
      status: captureStatus,
      amount: paymentAmount,
      planId: customId,
      payer: {
        email: captureData.payer?.email_address,
        name: `${captureData.payer?.name?.given_name} ${captureData.payer?.name?.surname}`,
      },
      timestamp: captureData.create_time
    });

  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}