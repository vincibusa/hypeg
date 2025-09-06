import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pagamento Annullato | HipeG Palermo - Riprova quando vuoi",
  description: "Pagamento annullato. Non è stato addebitato alcun importo. Puoi riprovare in qualsiasi momento ad acquistare i nostri servizi di comunicazione digitale.",
  robots: {
    index: false, // Cancel pages should not be indexed
    follow: false,
  },
  openGraph: {
    title: "Pagamento Annullato | HipeG Palermo",
    description: "Pagamento annullato. Non è stato addebitato alcun importo. Riprova quando vuoi!",
    url: "https://hypeg.it/checkout/cancel",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Pagamento Annullato | HipeG Palermo",
    description: "Pagamento annullato. Non è stato addebitato alcun importo. Riprova quando vuoi!",
  },
};

export default function CancelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}