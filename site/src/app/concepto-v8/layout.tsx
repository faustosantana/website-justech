import Script from "next/script";
import { LandingLock } from "@/components/v8/LandingLock";

export default function ConceptoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="landing-mode" strategy="beforeInteractive">
        {`document.documentElement.classList.add('landing-mode');document.body.classList.add('landing-mode');`}
      </Script>
      <LandingLock />
      {children}
    </>
  );
}
