"use client";

import { withBase } from "@/lib/paths";

type View = "general" | "red" | "seguridad" | "sucursales";

const pins: { id: string; label: string; x: string; y: string; views: View[]; from: number }[] = [
  { id: "isp", label: "ISP", x: "7%", y: "14%", views: ["general", "red"], from: 0 },
  { id: "router", label: "Router", x: "16%", y: "20%", views: ["general", "red"], from: 0 },
  { id: "fw", label: "Firewall", x: "26%", y: "18%", views: ["general", "red", "seguridad"], from: 1 },
  { id: "core", label: "Core", x: "40%", y: "16%", views: ["general", "red"], from: 2 },
  { id: "access", label: "Access", x: "58%", y: "38%", views: ["general", "red"], from: 3 },
  { id: "ap", label: "APs", x: "46%", y: "30%", views: ["general", "red"], from: 4 },
  { id: "users", label: "Puestos", x: "38%", y: "48%", views: ["general", "red"], from: 5 },
  { id: "servers", label: "Servidores", x: "36%", y: "74%", views: ["general", "red"], from: 6 },
  { id: "storage", label: "Almacenamiento", x: "52%", y: "78%", views: ["general"], from: 6 },
  { id: "cloud", label: "Nube", x: "78%", y: "16%", views: ["general", "seguridad"], from: 7 },
  { id: "branch", label: "Sucursal", x: "84%", y: "72%", views: ["general", "sucursales"], from: 0 },
];

export function NetworkBoard({ view, beat }: { view: View; beat: number }) {
  const fail = beat >= 8;
  const backup = beat >= 9;
  const ticket = beat >= 10;

  return (
    <figure className={`v7-shot v7-shot-${view}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/visual/v7/v7-network.jpg")}
        alt="Sede con ISP, firewall, switches, APs, puestos, rack, sucursal y nube."
        width={1536}
        height={1024}
      />
      <svg className="v7-net-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className={`v7-link ${beat >= 0 ? "is-on" : ""} ${fail ? "is-fail" : ""}`} d="M8 16 L16 20 L26 18 L40 16" />
        <path className={`v7-link ${beat >= 3 ? "is-on" : ""}`} d="M40 16 L58 38" />
        <path className={`v7-link ${beat >= 4 ? "is-on" : ""}`} d="M58 38 L46 30" />
        <path className={`v7-link ${beat >= 5 ? "is-on" : ""}`} d="M58 38 L38 48" />
        <path className={`v7-link ${beat >= 6 ? "is-on" : ""}`} d="M40 16 L36 74 L52 78" />
        <path className={`v7-link ${beat >= 7 ? "is-on" : ""}`} d="M40 16 L78 16" />
        <path className={`v7-link is-wan ${backup ? "is-on" : fail ? "is-wait" : ""}`} d="M26 18 C 48 88, 70 88, 84 72" />
      </svg>
      <ul className="v7-pins">
        {pins
          .filter((p) => p.views.includes(view))
          .map((p) => (
            <li
              key={p.id}
              className={beat >= p.from ? "is-on" : ""}
              style={{ left: p.x, top: p.y }}
            >
              <span />
              {p.label}
            </li>
          ))}
      </ul>
      {ticket ? <p className="v7-case-flag">Caso abierto · sucursal sin enlace primario</p> : null}
    </figure>
  );
}
