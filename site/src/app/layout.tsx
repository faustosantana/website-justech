import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Outfit } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { StagingBanner } from "@/components/Flags";
import { Header } from "@/components/Header";
import { company } from "@/content/site";
import "./globals.css";
import "./v5.css";
import "./v6.css";
import "./v7.css";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex",
});

const display = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-display-face",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4173"),
  title: {
    default: "Justech SRL · La capa tecnológica que mantiene el negocio en movimiento",
    template: "%s · Justech SRL",
  },
  description:
    "Justech conecta infraestructura, redes, software, seguridad y soporte para organizaciones que no pueden detenerse. Santo Domingo, desde 2018.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { locale: "es_DO", siteName: company.legalName, type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Justech SRL · Integradora tecnológica",
    description: "La capa tecnológica que mantiene el negocio en movimiento.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.production,
  foundingDate: String(company.founded),
  address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "DO" },
  telephone: company.phoneDisplay,
  email: company.email,
  sameAs: [company.facebook, company.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-DO" className={`${ibmPlex.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(/\\/concepto-v8(\\/|$)/.test(location.pathname)){document.documentElement.classList.add('landing-mode');document.body.classList.add('landing-mode');}}catch(e){}})();",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
