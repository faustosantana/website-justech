import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { StagingBanner } from "@/components/Flags";
import { Header } from "@/components/Header";
import { company } from "@/content/site";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex",
});

const ibmSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4173",
  ),
  title: {
    default: "Justech SRL · Integradora tecnológica en República Dominicana",
    template: "%s · Justech SRL",
  },
  description:
    "Justech evalúa, diseña, suministra, implementa y opera infraestructura, software, cableado y soporte para organizaciones que no pueden detenerse.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    locale: "es_DO",
    siteName: company.legalName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justech SRL · Integradora tecnológica en República Dominicana",
    description:
      "Infraestructura, software, cableado y soporte con un responsable de extremo a extremo.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.production,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    addressLocality: company.city,
    addressCountry: "DO",
  },
  telephone: company.phoneDisplay,
  email: company.email,
  sameAs: [company.facebook, company.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-DO" className={`${ibmPlex.variable} ${ibmSerif.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Analytics />
        <StagingBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
