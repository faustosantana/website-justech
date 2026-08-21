import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justech.do"),
  title: {
    default: "Justech SRL · Tecnología empresarial en República Dominicana",
    template: "%s · Justech SRL",
  },
  description:
    "Diseñamos, implementamos y gestionamos infraestructura, soporte, licenciamiento y equipos para organizaciones que no pueden detenerse.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    locale: "es_DO",
    siteName: company.legalName,
    type: "website",
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
    <html lang="es-DO" className={ibmPlex.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <StagingBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
