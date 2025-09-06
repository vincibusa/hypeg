import { Metadata } from 'next';
import DataSubjectRightsClient from './DataSubjectRightsClient';

export const metadata: Metadata = {
  title: "Diritti Privacy GDPR | HipeG Palermo - Gestisci i tuoi Dati Personali",
  description: "Esercita i tuoi diritti privacy previsti dal GDPR. Richiedi accesso, rettifica, cancellazione o portabilità dei tuoi dati personali trattati da HipeG in modo semplice e sicuro.",
  keywords: [
    "diritti privacy GDPR",
    "cancellazione dati personali",
    "diritto oblio HipeG",
    "accesso dati GDPR",
    "portabilità dati personali",
    "rettifica dati privacy",
    "opposizione trattamento dati",
    "gestione privacy utente"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Diritti Privacy GDPR | HipeG Palermo",
    description: "Portale per esercitare i tuoi diritti privacy GDPR. Gestisci i tuoi dati personali in modo sicuro.",
    url: "https://hypeg.it/diritti-privacy",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Diritti Privacy GDPR | HipeG Palermo",
    description: "Portale per esercitare i tuoi diritti privacy GDPR. Gestisci i tuoi dati personali in modo sicuro.",
  },
  alternates: {
    canonical: "https://hypeg.it/diritti-privacy",
  },
};

export default function DataSubjectRightsPage() {
  return <DataSubjectRightsClient />;
}