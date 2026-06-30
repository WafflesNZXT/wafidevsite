import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

interface CaseStudyDetailProps {
  study: CaseStudy;
}

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="case-detail-hero">
        <div className="container case-detail-hero-inner">
          <div className="case-detail-intro">
            <Link href="/case-studies" className="case-back-link"><ArrowLeft aria-hidden="true" /> All Case Studies</Link>
            <span className="case-study-category">{study.category}</span>
            <h1>{study.client}</h1>
            <p>{study.headline}</p>
          </div>
          <div className="case-detail-media">
            <Image className={study.imageClassName} src={study.image} alt={`${study.client} case study`} width={1500} height={950} priority sizes="(max-width: 850px) 100vw, 52vw" />
          </div>
        </div>
      </section>

      <section className="case-detail-overview">
        <div className="container case-overview-grid">
          <div>
            <span className="case-section-label">The challenge</span>
            <h2>Creating clarity around the product</h2>
            <p>{study.challenge}</p>
          </div>
          <aside className="case-scope">
            <div><h3>Services</h3><ul>{study.services.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Deliverables</h3><ul>{study.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </aside>
        </div>
      </section>

      <section className="case-detail-band">
        <div className="container">
          <span className="case-section-label">The approach</span>
          <h2>From ambiguity to a focused direction</h2>
          <ol className="case-approach-list">
            {study.approach.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="case-detail-results">
        <div className="container case-results-grid">
          <div>
            <span className="case-section-label">The solution</span>
            <h2>A system designed to grow</h2>
            <p>{study.solution}</p>
          </div>
          <div>
            <span className="case-section-label">The outcome</span>
            <h2>A stronger product foundation</h2>
            <p>{study.outcome}</p>
            <div className="case-outcome-note"><Check aria-hidden="true" /> Built around clear decisions and a reusable foundation.</div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Let&apos;s make your product easier to understand.</h2>
          <Link href="/hire" className="btn btn-primary">Discuss Your Project <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
