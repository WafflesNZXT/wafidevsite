import Link from "next/link";
import { PageHero } from "@/components/page-primitives";
import { ProjectsGallery } from "@/components/projects-gallery";

export function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="My Projects" subtitle="A showcase of my finest web development work" />
      <section className="projects" id="projects">
        <div className="container">
          <ProjectsGallery />
        </div>
      </section>
      <section className="cta">
        <div className="container">
          <h2>Ready to see your project come to life?</h2>
          <Link href="/hire" className="btn btn-primary">Let&apos;s Work Together</Link>
        </div>
      </section>
    </main>
  );
}
