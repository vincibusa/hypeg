import { Metadata } from 'next';
import TermsOfServiceClient from './TermsOfServiceClient';

export const metadata: Metadata = {
  title: "Termini di Servizio | HipeG Palermo - Condizioni Generali di Vendita",
  description: "Termini di servizio e condizioni generali di vendita di HipeG per servizi di comunicazione digitale, social media management e sviluppo siti web a Palermo.",
  keywords: [
    "termini servizio HipeG",
    "condizioni generali vendita",
    "contratto servizi digitali Palermo",
    "termini comunicazione digitale",
    "condizioni social media management",
    "contratto siti web Sicilia",
    "termini agenzia pubblicità"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Termini di Servizio | HipeG Palermo",
    description: "Termini di servizio e condizioni generali per i servizi di comunicazione digitale di HipeG.",
    url: "https://hypeg.it/terms",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Termini di Servizio | HipeG Palermo",
    description: "Termini di servizio e condizioni generali per i servizi di comunicazione digitale di HipeG.",
  },
  alternates: {
    canonical: "https://hypeg.it/terms",
  },
};

export default function TermsPage() {
  return <TermsOfServiceClient />;
}