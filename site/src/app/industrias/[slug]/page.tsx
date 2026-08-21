import { notFound } from "next/navigation";
import { CapabilityPage } from "@/components/CapabilityPage";
import { industryAliases, industryCaps, resolveIndustry } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = new Set([...industryCaps.map((s) => s.slug), ...Object.keys(industryAliases)]);
  slugs.delete("multisucursal");
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { cap } = resolveIndustry(slug);
  if (!cap) return {};
  return pageMeta(cap.title, cap.seoDesc, cap.href);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { cap } = resolveIndustry(slug);
  if (!cap) notFound();
  return <CapabilityPage cap={cap} />;
}
