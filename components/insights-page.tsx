import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { insights } from "@/lib/insights";
import { PageHero } from "@/components/page-primitives";

export function InsightsPage() {
  return <main id="main-content" tabIndex={-1}><PageHero title="Insights" subtitle="Practical notes for planning a better website" /><section className="insights-index"><div className="container insights-grid">{insights.map((insight) => <article className="insight-card" key={insight.slug}><div className="insight-meta"><span>{insight.category}</span><span>{insight.readTime}</span></div><BookOpen aria-hidden="true" /><h2>{insight.title}</h2><p>{insight.excerpt}</p><Link href={`/insights/${insight.slug}`}>Read Insight <ArrowRight aria-hidden="true" /></Link></article>)}</div></section></main>;
}
