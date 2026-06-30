"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-primitives";
import { projectById, type Project } from "@/lib/site-data";

export function ProjectDetail() {
  const [project, setProject] = useState<Project | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id") ?? "";
    setProject(projectById[id] ?? null);
    setResolved(true);
  }, []);

  if (!resolved) {
    return <main id="main-content" className="project-loading"><p>Loading project...</p></main>;
  }

  if (!project) {
    return (
      <main id="main-content" tabIndex={-1}>
        <PageHero title="Project Not Found" subtitle="That project could not be found." />
        <section className="project-detail"><div className="container"><Link className="btn btn-primary" href="/projects"><ArrowLeft aria-hidden="true" /> Back to Projects</Link></div></section>
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title={project.title} subtitle={project.subtitle} />
      <section className="project-detail" id="projectDetail">
        <div className="container">
          <article className="project-detail-card">
            <div className="detail-media">
              <Image src={project.image} alt={project.title} className="detail-img" width={1600} height={950} priority sizes="(max-width: 900px) 100vw, 1100px" />
            </div>
            <div className="detail-content">
              <p className="detail-desc">{project.description}</p>
              <div className="project-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="detail-actions">
                <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary">Open Live Site <ExternalLink aria-hidden="true" /></a>
                <Link href="/projects" className="btn btn-secondary"><ArrowLeft aria-hidden="true" /> Back to Projects</Link>
              </div>
            </div>
          </article>
          <section className="timeline" aria-labelledby="timeline-heading">
            <h2 className="timeline-title" id="timeline-heading">Project Timeline</h2>
            <ol className="timeline-list">
              {project.timeline.map((step) => (
                <li className="timeline-item" key={`${step.date}-${step.title}`}>
                  <span className="time">{step.date}</span>
                  <div className="title">{step.title}</div>
                  <div className="desc">{step.description}</div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}
