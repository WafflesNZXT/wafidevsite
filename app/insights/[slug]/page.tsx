import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightDetail } from "@/components/insight-detail";
import { insightBySlug, insights } from "@/lib/insights";

export function generateStaticParams() { return insights.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const insight = insightBySlug[slug];
  return insight ? { title: insight.title, description: insight.excerpt, alternates: { canonical: `/insights/${slug}` } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const insight = insightBySlug[slug]; if (!insight) notFound(); return <InsightDetail insight={insight} />;
}
