import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

// Configurazione Nodemailer
const transporter = createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ReminderRequest {
  paymentIds: string[];
  message: string;
  customerEmails: string[];
  customerNames: string[];
  planNames: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { paymentIds, message, customerEmails, customerNames, planNames }: ReminderRequest = await request.json();

    // Validazione
    if (!paymentIds || paymentIds.length === 0) {
      return NextResponse.json(
        { error: 'Nessun pagamento selezionato' },
        { status: 400 }
      );
    }

    if (!message.trim()) {
      return NextResponse.json(
        { error: 'Messaggio mancante' },
        { status: 400 }
      );
    }

    if (!customerEmails || customerEmails.length === 0) {
      return NextResponse.json(
        { error: 'Nessuna email destinatario' },
        { status: 400 }
      );
    }

    // Invia email a tutti i destinatari
    const results = [];
    
    for (let i = 0; i < customerEmails.length; i++) {
      const email = customerEmails[i];
      const name = customerNames[i] || 'Cliente';
      const planName = planNames[i] || 'servizio';

      try {
        const mailOptions = {
          from: {
            name: 'HipeG Creative Company',
            address: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@hipeg.com'
          },
          to: email,
          subject: `🔔 Promemoria Rinnovo - ${planName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>HipeG Creative Company</h1>
                  <p>Comunicazione Digitale Professionale</p>
                </div>
                <div class="content">
                  <h2>Ciao ${name},</h2>
                  <p>Questo è un promemoria per il rinnovo del tuo piano <strong>${planName}</strong>.</p>
                  
                  <div style="background: #fff; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
                    <p><strong>Messaggio:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>

                  <p>Per rinnovare il tuo servizio, accedi al tuo account o contattaci per assistenza.</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="https://hipeg.com/dashboard" class="button">Accedi al Tuo Account</a>
                  </div>

                  <p>Grazie per aver scelto HipeG!</p>
                  <p><strong>Team HipeG</strong></p>
                </div>
                <div class="footer">
                  <p>HipeG Creative Company • P.IVA: 12345678901</p>
                  <p>Email: info@hipeg.com • Tel: +39 123 456 7890</p>
                  <p>Se non desideri ricevere più questi promemoria, <a href="https://hipeg.com/unsubscribe">clicca qui</a>.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        
        results.push({
          email,
          success: true,
          messageId: info.messageId,
          name
        });

        console.log('Email inviata a:', email, 'Message ID:', info.messageId);

      } catch (emailError) {
        console.error('Errore invio email a', email, ':', emailError);
        
        results.push({
          email,
          success: false,
          error: emailError instanceof Error ? emailError.message : 'Errore sconosciuto',
          name
        });
      }
    }

    // Statistiche
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      message: `Email inviate: ${successful} successo, ${failed} falliti`,
      total: customerEmails.length,
      successful,
      failed,
      results
    });

  } catch (error) {
    console.error('Errore generale invio reminder:', error);
    
    return NextResponse.json(
      { 
        error: 'Errore interno del server',
        message: error instanceof Error ? error.message : 'Errore sconosciuto'
      },
      { status: 500 }
    );
  }
}