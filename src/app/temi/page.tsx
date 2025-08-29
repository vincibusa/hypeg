import { Metadata } from 'next';
import TemiClient from './TemiClient';

export const metadata: Metadata = {
  title: "Temi e Template Siti Web Professionali | HipeG Palermo",
  description: "Scopri la collezione di temi e template per siti web professionali di HipeG. Design moderni per e-commerce, corporate, portfolio e blog. Siti web ottimizzati SEO a Palermo.",
  keywords: [
    "temi siti web Palermo",
    "template wordpress Palermo", 
    "design web professionale",
    "temi e-commerce Sicilia",
    "template corporate Italia",
    "web design Palermo",
    "siti web personalizzati",
    "temi responsive mobile"
  ],
  openGraph: {
    title: "Temi e Template Siti Web | HipeG Palermo",
    description: "Collezione di temi professionali per siti web: e-commerce, corporate, portfolio e blog. Design moderni e ottimizzati SEO.",
    url: "https://hypeg.it/temi",
    siteName: "HipeG",
    images: [
      {
        url: "/images/services/web-development.jpg",
        width: 1200,
        height: 630,
        alt: "Temi e Template Siti Web Professionali HipeG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temi e Template Siti Web | HipeG Palermo",
    description: "Scopri i nostri temi professionali per siti web: e-commerce, corporate, portfolio. Design moderni e ottimizzati per ogni esigenza.",
    images: ["/images/services/web-development.jpg"],
  },
  alternates: {
    canonical: "https://hypeg.it/temi",
  },
};

export default function TemiPage() {
  return <TemiClient />;
}