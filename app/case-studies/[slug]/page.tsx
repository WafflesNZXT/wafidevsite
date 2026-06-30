import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { caseStudies, caseStudyBySlug } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug[slug];
  if (!study) return {};
  return {
    title: `${study.client} Case Study`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudyBySlug[slug];
  if (!study) notFound();
  return <CaseStudyDetail study={study} />;
}
