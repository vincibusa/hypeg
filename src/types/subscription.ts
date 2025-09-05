export interface Customer {
  id: string;
  email: string;
  name: string;
  paypal_customer_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'MONTH' | 'YEAR';
  interval_count: number;
  paypal_plan_id?: string;
  features: string[];
  category: 'Social' | 'Web' | 'Grafica';
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Subscription {
  id: string;
  customer_id: string;
  plan_id: string;
  paypal_subscription_id?: string;
  status: 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
  start_time?: Date;
  next_billing_date?: Date;
  last_payment_date?: Date;
  failed_payment_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface SubscriptionPayment {
  id: string;
  subscription_id?: string;
  customer_id?: string;
  plan_id: string;
  paypal_payment_id?: string;
  paypal_order_id?: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
  paid_at?: Date;
  failure_reason?: string;
  created_at: Date;
  next_payment_reminder?: Date;
}

export interface PayPalBillingPlan {
  id: string;
  product_id: string;
  name: string;
  description: string;
  status: 'CREATED' | 'INACTIVE' | 'ACTIVE';
  billing_cycles: {
    frequency: {
      interval_unit: 'MONTH' | 'YEAR';
      interval_count: number;
    };
    tenure_type: 'REGULAR';
    sequence: number;
    total_cycles: number;
    pricing_scheme: {
      fixed_price: {
        value: string;
        currency_code: string;
      };
    };
  }[];
  payment_preferences: {
    auto_bill_outstanding: boolean;
    setup_fee_failure_action: 'CONTINUE' | 'CANCEL';
    payment_failure_threshold: number;
  };
  taxes: {
    percentage: string;
    inclusive: boolean;
  };
  create_time: string;
  update_time: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalSubscription {
  id: string;
  plan_id: string;
  start_time: string;
  quantity: string;
  shipping_amount: {
    currency_code: string;
    value: string;
  };
  subscriber: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
  billing_info: {
    outstanding_balance: {
      currency_code: string;
      value: string;
    };
    cycle_executions: Array<{
      tenure_type: string;
      sequence: number;
      cycles_completed: number;
      cycles_remaining: number;
      current_pricing_scheme: {
        fixed_price: {
          currency_code: string;
          value: string;
        };
      };
      total_cycles: number;
    }>;
    last_payment: {
      amount: {
        currency_code: string;
        value: string;
      };
      time: string;
    };
    next_billing_time: string;
    failed_payments_count: number;
  };
  status: 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
  status_update_time: string;
  create_time: string;
  update_time: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}