import Link from "next/link";
import { company, legalLinks, services, solutions } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-navy text-[#d5dee6]">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/justech-mark-white.png"
            alt=""
            width={72}
            height={48}
            className="mb-4 h-12 w-auto"
          />
          <p className="m-0 text-sm leading-relaxed">
            {company.legalName}. Tecnología empresarial desde {company.city},{" "}
            {company.country}. Fundada en {company.founded}.
          </p>
        </div>
        <div>
          <h2 className="mt-0 mb-3 text-sm tracking-[0.14em] text-white uppercase">
            Soluciones
          </h2>
          <ul className="m-0 list-none p-0 text-sm">
            {solutions
              .filter((s) => !s.pending)
              .map((s) => (
                <li key={s.href} className="mb-2">
                  <Link className="text-inherit no-underline hover:underline" href={s.href}>
                    {s.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="mt-0 mb-3 text-sm tracking-[0.14em] text-white uppercase">
            Servicios
          </h2>
          <ul className="m-0 list-none p-0 text-sm">
            {services
              .filter((s) => !s.pending)
              .map((s) => (
                <li key={s.href} className="mb-2">
                  <Link className="text-inherit no-underline hover:underline" href={s.href}>
                    {s.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="mt-0 mb-3 text-sm tracking-[0.14em] text-white uppercase">
            Contacto
          </h2>
          <p className="m-0 text-sm">
            <a className="text-inherit" href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
            <br />
            <a className="text-inherit" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <br />
            <a className="text-inherit" href={company.supportUrl}>
              Portal de soporte
            </a>
          </p>
          <p className="mt-4 text-xs">
            WhatsApp y {company.emailSalesPending}:{" "}
            <span className="pending-flag">Pendiente validación</span>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4 text-xs">
          <p className="m-0">
            © {new Date().getFullYear()} {company.legalName}. Staging — no es el sitio
            público.
          </p>
          <nav aria-label="Legal">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="mr-3 text-inherit no-underline hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
