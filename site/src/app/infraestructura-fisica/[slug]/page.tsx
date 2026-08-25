import { notFound } from "next/navigation";
import { CapabilityPage } from "@/components/CapabilityPage";
import { cablingCaps, findCap } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return cablingCaps.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = findCap(cablingCaps, slug);
  if (!cap) return {};
  return pageMeta(cap.title, cap.seoDesc, cap.href);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = findCap(cablingCaps, slug);
  if (!cap) notFound();
  return <CapabilityPage cap={cap} />;
}
