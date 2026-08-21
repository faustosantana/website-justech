import Link from "next/link";
import { company, intents, legalLinks } from "@/content/site";
import { withBase } from "@/lib/paths";

const columns = [
  {
    title: "Capacidades",
    links: [
      { href: "/soluciones/", label: "Soluciones" },
      { href: "/servicios/", label: "Servicios" },
      { href: "/productos/", label: "Productos y tecnología" },
      { href: "/infraestructura-fisica/", label: "Infraestructura física" },
      { href: "/industrias/", label: "Industrias" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/nosotros/", label: "Nosotros" },
      { href: "/nosotros/metodologia/", label: "Metodología" },
      { href: "/recursos/", label: "Recursos" },
      { href: "/tecnologias/", label: "Ecosistema tecnológico" },
      { href: "/soporte/", label: "Soporte" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer mt-20 border-t border-line bg-navy text-[#d5dee6]">
      <div className="container grid gap-10 py-16 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/brand/justech-mark-white.png")}
            alt=""
            width={72}
            height={48}
            className="mb-4 h-12 w-auto"
          />
          <p className="m-0 text-sm leading-relaxed">
            {company.legalName}. Integradora tecnológica desde {company.city}, {company.country}.
            Fundada en {company.founded}.
          </p>
          <p className="mt-4 mb-0 text-sm">
            <a className="inline-flex min-h-11 items-center text-inherit" href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
            <br />
            <a className="inline-flex min-h-11 items-center text-inherit" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="footer-heading">{col.title}</h2>
            <ul className="m-0 list-none p-0 text-sm">
              {col.links.map((s) => (
                <li key={s.href} className="mb-2">
                  <Link className="text-inherit no-underline hover:underline" href={s.href}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="footer-heading">Conversaciones</h2>
          <ul className="m-0 list-none p-0 text-sm">
            {intents.map((i) => (
              <li key={i.id} className="mb-2">
                <Link className="text-inherit no-underline hover:underline" href={i.landing}>
                  {i.label}
                </Link>
              </li>
            ))}
            <li className="mb-2">
              <a className="text-inherit no-underline hover:underline" href={company.supportUrl}>
                Portal de soporte
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[#9aa8b2]">{company.hours}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4 text-xs">
          <p className="m-0">
            © {new Date().getFullYear()} {company.legalName}. Entorno de previsualización.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-3 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-inherit no-underline hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
