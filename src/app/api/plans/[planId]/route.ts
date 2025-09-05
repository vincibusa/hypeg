import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionPlan } from '@/lib/firestore';

interface RouteParams {
  params: Promise<{
    planId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { planId } = await params;

    console.log('Getting plan details:', planId);

    // Step 1: Cercare prima per nome piano (compatibilità con i nomi esistenti)
    // Mappa i nomi esistenti ai nomi dei piani nel database
    const planNameMap: Record<string, string> = {
      'a-tutto-meta': 'A tutto Meta',
      'a-tutto-meta-20': 'A tutto Meta 2.0',
      'linkedin': 'LinkedIn',
      'tiktok': 'TikTok',
      'pack-professionale': 'Pack Professionale',
      'grafica': 'Grafica',
      'sito-landing': 'Sito Landing Page',
      'sito-standard': 'Sito Standard',
      'sito-large': 'Sito Large',
      'e-shop-basic': 'E-shop Basic',
      'e-shop-ultra': 'E-shop Ultra',
      'sito-ricettive': 'Sito Strutture Ricettive'
    };

    let plan;
    
    // Prova prima a cercare per ID
    plan = await getSubscriptionPlan(planId);
    
    // Se non trovato e c'è una mappatura nome, cerca per nome
    if (!plan && planNameMap[planId]) {
      const { query, where, getDocs } = await import('firebase/firestore');
      const { plansCollection } = await import('@/lib/firestore');
      
      const q = query(plansCollection, where('name', '==', planNameMap[planId]));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        plan = {
          id: doc.id,
          ...data,
          created_at: data.created_at.toDate(),
          updated_at: data.updated_at.toDate()
        } as any;
      }
    }

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        interval: plan.interval,
        interval_count: plan.interval_count,
        category: plan.category,
        features: plan.features,
        paypal_plan_id: plan.paypal_plan_id,
        active: plan.active
      }
    });

  } catch (error) {
    console.error('Error getting plan details:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get plan details',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}