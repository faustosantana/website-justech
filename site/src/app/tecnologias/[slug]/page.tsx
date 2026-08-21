import { notFound } from "next/navigation";
import { CapabilityPage } from "@/components/CapabilityPage";
import { findCap, technologyCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return technologyCaps.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = findCap(technologyCaps, slug);
  if (!cap) return {};
  return pageMeta(cap.title, cap.seoDesc, cap.href);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = findCap(technologyCaps, slug);
  if (!cap) notFound();
  return <CapabilityPage cap={cap} />;
}
