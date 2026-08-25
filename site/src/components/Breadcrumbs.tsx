import Link from "next/link";
import { company } from "@/content/site";

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href
        ? item.href.startsWith("http")
          ? item.href
          : `${company.production}${item.href}`
        : undefined,
    })),
  };

  return (
    <nav aria-label="Miga de pan" className="breadcrumbs">
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-muted">
        {items.map((item, i) => (
          <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {i === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-navy no-underline hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
