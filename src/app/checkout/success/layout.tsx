import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pagamento Completato con Successo | HipeG Palermo",
  description: "Pagamento completato con successo! Il tuo servizio di comunicazione digitale HipeG è stato attivato. Riceverai una conferma via email con tutti i dettagli.",
  robots: {
    index: false, // Success pages should not be indexed
    follow: false,
  },
  openGraph: {
    title: "Pagamento Completato | HipeG Palermo",
    description: "Il tuo pagamento è stato completato con successo. Servizio attivato!",
    url: "https://hypeg.it/checkout/success",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Pagamento Completato | HipeG Palermo",
    description: "Il tuo pagamento è stato completato con successo. Servizio attivato!",
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}