import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import type { Insight } from "@/lib/insights";

export function InsightDetail({ insight }: { insight: Insight }) {
  return <main id="main-content" tabIndex={-1}><article className="insight-detail"><header className="container"><Link href="/insights" className="back-link"><ArrowLeft aria-hidden="true" /> All Insights</Link><div className="insight-meta"><span>{insight.category}</span><span><Clock3 aria-hidden="true" /> {insight.readTime}</span></div><h1>{insight.title}</h1><p>{insight.excerpt}</p></header><div className="container insight-body">{insight.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<aside className="insight-cta"><h2>Planning a project?</h2><p>Turn these ideas into a practical scope and estimate.</p><Link href="/hire" className="btn btn-primary">Plan Your Website</Link></aside></div></article></main>;
}
