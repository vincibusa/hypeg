import { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: "Privacy Policy | HipeG Palermo - Informativa sulla Privacy GDPR",
  description: "Informativa sulla privacy di HipeG conforme al GDPR. Scopri come trattiamo i tuoi dati personali per i servizi di comunicazione digitale e social media management a Palermo.",
  keywords: [
    "privacy policy HipeG",
    "informativa privacy GDPR",
    "trattamento dati personali Palermo",
    "privacy comunicazione digitale",
    "GDPR compliance agenzia",
    "protezione dati Sicilia",
    "policy privacy social media"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | HipeG Palermo",
    description: "Informativa sulla privacy di HipeG conforme al GDPR per i servizi di comunicazione digitale.",
    url: "https://hypeg.it/privacy",
    siteName: "HipeG",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | HipeG Palermo",
    description: "Informativa sulla privacy di HipeG conforme al GDPR per i servizi di comunicazione digitale.",
  },
  alternates: {
    canonical: "https://hypeg.it/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyClient />;
}