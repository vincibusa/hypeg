import type { PayPalBillingPlan, PayPalSubscription } from '@/types/subscription';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

export interface PayPalAccessToken {
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  supported_authn_schemes: string[];
  nonce: string;
  client_id: string;
  scope: string;
}

// Funzione per ottenere l'access token PayPal
export async function getPayPalAccessToken(): Promise<string> {
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
    const errorText = await response.text();
    console.error('PayPal token error:', errorText);
    throw new Error(`Failed to get PayPal access token: ${response.status}`);
  }

  const data: PayPalAccessToken = await response.json();
  return data.access_token;
}

// Creare un prodotto PayPal (prerequisito per i billing plans)
export async function createPayPalProduct(productData: {
  name: string;
  description: string;
  type: 'SERVICE' | 'DIGITAL' | 'PHYSICAL';
  category: string;
}): Promise<{ id: string }> {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'PayPal-Request-Id': `HIPEG_PRODUCT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      name: productData.name,
      description: productData.description,
      type: productData.type,
      category: 'SOFTWARE', // Categoria valida per tutti i servizi digitali
      image_url: 'https://hypeg-56f5d.web.app/favicon.ico', // Logo HipeG
      home_url: 'https://hypeg-56f5d.web.app'
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal product creation error:', errorText);
    throw new Error(`Failed to create PayPal product: ${response.status}`);
  }

  return response.json();
}

// Creare un billing plan PayPal
export async function createPayPalBillingPlan(planData: {
  product_id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval_unit: 'MONTH' | 'YEAR';
  interval_count: number;
}): Promise<PayPalBillingPlan> {
  const accessToken = await getPayPalAccessToken();
  
  const billingPlanPayload = {
    product_id: planData.product_id,
    name: planData.name,
    description: planData.description,
    billing_cycles: [
      {
        frequency: {
          interval_unit: planData.interval_unit,
          interval_count: planData.interval_count,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0, // 0 = infinite cycles
        pricing_scheme: {
          fixed_price: {
            value: planData.price.toFixed(2),
            currency_code: planData.currency,
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3,
    },
    taxes: {
      percentage: '22.00', // IVA italiana
      inclusive: false,
    },
  };

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'PayPal-Request-Id': `HIPEG_PLAN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(billingPlanPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal billing plan creation error:', errorText);
    throw new Error(`Failed to create PayPal billing plan: ${response.status}`);
  }

  return response.json();
}

// Attivare un billing plan PayPal
export async function activatePayPalBillingPlan(planId: string): Promise<void> {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans/${planId}/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal billing plan activation error:', errorText);
    throw new Error(`Failed to activate PayPal billing plan: ${response.status}`);
  }
}

// Ottenere dettagli di un billing plan
export async function getPayPalBillingPlan(planId: string): Promise<PayPalBillingPlan> {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans/${planId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal billing plan fetch error:', errorText);
    throw new Error(`Failed to get PayPal billing plan: ${response.status}`);
  }

  return response.json();
}

// Creare una subscription PayPal
export async function createPayPalSubscription(subscriptionData: {
  plan_id: string;
  subscriber: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
  application_context: {
    brand_name: string;
    locale: string;
    shipping_preference: 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS' | 'GET_FROM_FILE';
    user_action: 'SUBSCRIBE_NOW' | 'CONTINUE';
    payment_method: {
      payer_selected: 'PAYPAL';
      payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED';
    };
    return_url: string;
    cancel_url: string;
  };
  custom_id?: string;
}): Promise<PayPalSubscription> {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'PayPal-Request-Id': `HIPEG_SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(subscriptionData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal subscription creation error:', errorText);
    throw new Error(`Failed to create PayPal subscription: ${response.status}`);
  }

  return response.json();
}

// Ottenere dettagli di una subscription
export async function getPayPalSubscription(subscriptionId: string): Promise<PayPalSubscription> {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal subscription fetch error:', errorText);
    throw new Error(`Failed to get PayPal subscription: ${response.status}`);
  }

  return response.json();
}

// Cancellare una subscription
export async function cancelPayPalSubscription(subscriptionId: string, reason: string): Promise<void> {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      reason: reason
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal subscription cancellation error:', errorText);
    throw new Error(`Failed to cancel PayPal subscription: ${response.status}`);
  }
}

// Verificare webhook signature PayPal
export async function verifyPayPalWebhookSignature(
  headers: Record<string, string>,
  body: string,
  webhookId: string
): Promise<{ verification_status: 'SUCCESS' | 'FAILURE' }> {
  const accessToken = await getPayPalAccessToken();
  
  const verificationData = {
    auth_algo: headers['paypal-auth-algo'] || headers['PAYPAL-AUTH-ALGO'],
    cert_id: headers['paypal-cert-id'] || headers['PAYPAL-CERT-ID'],
    transmission_id: headers['paypal-transmission-id'] || headers['PAYPAL-TRANSMISSION-ID'],
    transmission_sig: headers['paypal-transmission-sig'] || headers['PAYPAL-TRANSMISSION-SIG'],
    transmission_time: headers['paypal-transmission-time'] || headers['PAYPAL-TRANSMISSION-TIME'],
    webhook_id: webhookId,
    webhook_event: JSON.parse(body)
  };

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(verificationData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal webhook verification error:', errorText);
    throw new Error(`Failed to verify PayPal webhook: ${response.status}`);
  }

  return response.json();
}