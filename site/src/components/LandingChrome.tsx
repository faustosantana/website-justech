"use client";

import { useEffect } from "react";
import Link from "next/link";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";

export function LandingChrome() {
  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => document.body.classList.remove("landing-mode");
  }, []);

  return (
    <div className="landing-bar">
      <div className="container flex items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/brand/justech-logo.png")} alt="Justech" width={140} height={34} className="h-8 w-auto" />
        </Link>
        <a className="nav-link nav-link-strong" href={`tel:${company.phoneTel}`}>
          {company.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
