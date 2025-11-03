import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HipeG - Agenzia Comunicazione Digitale Palermo | Siti Web, Social Media, Marketing",
  description: "HipeG: agenzia di comunicazione digitale a Palermo specializzata in siti web, social media, video e branding. Servizi completi per aziende in Sicilia e Italia. Preventivo gratuito!",
  keywords: [
    "HipeG",
    "agenzia comunicazione Palermo",
    "agenzie comunicazione Palermo", 
    "social media manager Palermo",
    "siti web Palermo",
    "web design Palermo",
    "marketing digitale Sicilia",
    "agenzia pubblicità Palermo",
    "creazione siti web Sicilia",
    "social media marketing Italia",
    "comunicazione digitale Palermo",
    "grafica pubblicitaria Sicilia",
    "video marketing Palermo",
    "agenzia marketing Palermo",
    "web agency Sicilia",
    "realizzazione siti web Palermo",
    "gestione social media Sicilia",
    "branding aziendale Palermo",
    "e-commerce Sicilia",
    "posizionamento SEO Palermo"
  ],
  authors: [{ name: "HipeG Creative Agency" }],
  creator: "HipeG",
  publisher: "HipeG",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://hypeg.it",
    title: "HipeG - Agenzia Comunicazione Digitale Palermo | Siti Web e Social Media",
    description: "Agenzia di comunicazione digitale a Palermo specializzata in siti web, social media marketing, video e grafica. Serviamo clienti in tutta la Sicilia e Italia.",
    siteName: "HipeG",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "HipeG - Agenzia Comunicazione Digitale Palermo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HipeG - Agenzia Comunicazione Digitale Palermo | Siti Web e Social Media",
    description: "Realizziamo siti web, gestiamo social media e facciamo marketing digitale per aziende a Palermo e in tutta la Sicilia.",
    images: ["/images/hero/hero-bg.jpg"],
  },
  alternates: {
    canonical: "https://hypeg.it",
  },
  other: {
    "geo.region": "IT-82",
    "geo.placename": "Palermo",
    "geo.position": "38.1406359;13.3618609",
    "ICBM": "38.1406359, 13.3618609",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hypeg.it/#organization",
    "name": "HipeG",
    "alternateName": "HipeG Creative Agency",
    "description": "Agenzia di comunicazione digitale a Palermo specializzata in siti web, social media marketing, video e grafica pubblicitaria per aziende in Sicilia e Italia. Servizi completi di web design, SEO e branding.",
    "url": "https://hypeg.it",
    "logo": "https://hypeg.it/logo.png",
    "image": "https://hypeg.it/images/hero/hero-bg.jpg",
    "telephone": "+39 349 385 0703",
    "email": "commerciale@pubbliworks.it",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Antonio Daneu 30",
      "addressLocality": "Palermo",
      "addressRegion": "Sicilia",
      "postalCode": "90142",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.1406359",
      "longitude": "13.3618609"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Palermo"
      },
      {
        "@type": "City",
        "name": "Catania"
      },
      {
        "@type": "City",
        "name": "Messina"
      },
      {
        "@type": "City",
        "name": "Trapani"
      },
      {
        "@type": "State",
        "name": "Sicilia"
      },
      {
        "@type": "Country",
        "name": "Italia"
      }
    ],
    "serviceType": ["Web Design", "Social Media Marketing", "Comunicazione Digitale", "Video Marketing", "Grafica Pubblicitaria", "SEO Ottimizzazione", "Branding Aziendale", "E-commerce Development"],
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://www.instagram.com/hypeg",
      "https://www.facebook.com/hypeg",
      "https://www.linkedin.com/company/hypeg"
    ]
  };

  return (
    <html lang="it" data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <ThemeProvider>
          {children}
          <CookieConsent />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
