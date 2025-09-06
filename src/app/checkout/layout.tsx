import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Checkout Servizi Digitali | HipeG Palermo - Acquista ora",
  description: "Completa l'acquisto dei servizi di comunicazione digitale HipeG. Social media management, siti web, e-commerce e grafica professionale a Palermo. Pagamento sicuro con PayPal.",
  keywords: [
    "checkout servizi HipeG",
    "acquista social media management Palermo", 
    "pagamento siti web Sicilia",
    "acquisto servizi digitali",
    "checkout sicuro PayPal",
    "preventivo comunicazione Palermo",
    "acquista grafica professionale",
    "ordina servizi web Sicilia"
  ],
  robots: {
    index: false, // Checkout pages should not be indexed
    follow: false,
  },
  openGraph: {
    title: "Checkout Servizi Digitali | HipeG Palermo",
    description: "Completa l'acquisto dei tuoi servizi di comunicazione digitale con pagamento sicuro.",
    url: "https://hypeg.it/checkout",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Checkout Servizi Digitali | HipeG Palermo", 
    description: "Completa l'acquisto dei tuoi servizi di comunicazione digitale con pagamento sicuro.",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}