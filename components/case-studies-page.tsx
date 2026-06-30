import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-primitives";
import { caseStudies } from "@/lib/case-studies";

export function CaseStudiesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="Case Studies" subtitle="A closer look at the thinking behind selected product work" />
      <section className="case-studies-index">
        <div className="container">
          <div className="case-study-grid">
            {caseStudies.map((study) => (
              <article className="case-study-card" key={study.slug}>
                <div className="case-study-media">
                  <Image className={study.imageClassName} src={study.image} alt={`${study.client} project`} width={1200} height={760} sizes="(max-width: 800px) 100vw, 33vw" />
                </div>
                <div className="case-study-card-content">
                  <span className="case-study-category">{study.category}</span>
                  <h2>{study.client}</h2>
                  <h3>{study.headline}</h3>
                  <p>{study.summary}</p>
                  <Link href={`/case-studies/${study.slug}`} className="project-link">
                    Read Case Study <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="container">
          <h2>Have a project that needs this kind of focus?</h2>
          <Link href="/hire" className="btn btn-primary">Start Your Project</Link>
        </div>
      </section>
    </main>
  );
}
