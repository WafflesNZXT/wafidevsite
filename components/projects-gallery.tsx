"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { projects } from "@/lib/site-data";

const filters = ["All", "Business", "E-commerce", "Web Apps", "Education", "Wellness"] as const;
type Filter = (typeof filters)[number];

export function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);

  return (
    <>
      <div className="project-filter-bar" aria-label="Filter projects">
        {filters.map((option) => {
          const count = option === "All" ? projects.length : projects.filter((project) => project.category === option).length;
          return (
            <button type="button" className={filter === option ? "active" : ""} aria-pressed={filter === option} onClick={() => setFilter(option)} key={option}>
              <span>{option}</span><small>{count}</small>
            </button>
          );
        })}
      </div>
      <p className="project-filter-status" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</p>
      <div className="projects-grid tsx-projects-grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-image">
              <Image src={project.image} alt={project.title} className="project-img" width={1400} height={850} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.cardDescription}</p>
              <div className="project-tags">
                {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <Link href={`/project?id=${project.id}`} className="project-link">
                View Project <ChevronRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
