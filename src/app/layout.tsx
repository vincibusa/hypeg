import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HipeG - Comunicazione Digitale a 360°",
  description: "Siamo HipeG: un team giovane, creativo e affamato di innovazione. Ci occupiamo di comunicazione digitale a 360°, con un approccio umano, diretto e sempre orientato ai risultati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-theme="dark">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
