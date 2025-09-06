import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard Pagamenti | HipeG Palermo - Gestisci i tuoi servizi",
  description: "Accedi alla dashboard HipeG per gestire i pagamenti dei servizi di comunicazione digitale. Visualizza storico pagamenti, rinnovi e gestisci i tuoi piani social e web a Palermo.",
  keywords: [
    "dashboard pagamenti HipeG",
    "gestione servizi digitali Palermo", 
    "storico pagamenti social media",
    "rinnovi servizi web Palermo",
    "account cliente HipeG",
    "area personale agenzia comunicazione",
    "dashboard siti web Sicilia",
    "gestione abbonamenti social"
  ],
  robots: {
    index: false, // Dashboard pages should not be indexed
    follow: false,
  },
  openGraph: {
    title: "Dashboard Pagamenti | HipeG Palermo",
    description: "Area riservata per la gestione dei servizi di comunicazione digitale e pagamenti.",
    url: "https://hypeg.it/dashboard",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Dashboard Pagamenti | HipeG Palermo",
    description: "Area riservata per la gestione dei servizi di comunicazione digitale e pagamenti.",
  },
  alternates: {
    canonical: "https://hypeg.it/dashboard",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}