import { notFound } from "next/navigation";
import { CapabilityPage } from "@/components/CapabilityPage";
import { resolveSolution, solutionAliases, solutionCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = new Set([...solutionCaps.map((s) => s.slug), ...Object.keys(solutionAliases)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { cap } = resolveSolution(slug);
  if (!cap) return {};
  return pageMeta(cap.title, cap.seoDesc, cap.href);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { cap } = resolveSolution(slug);
  if (!cap) notFound();
  return <CapabilityPage cap={cap} />;
}
