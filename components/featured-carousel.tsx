"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const featuredProjects = [
  { id: "inobex", title: "Inobex", description: "Enterprise solutions and business intelligence platform", image: "/images/inobex.jpeg" },
  { id: "haider-cricket", title: "Haider Cricket", description: "Cricket statistics and player analytics platform", image: "/images/haider-cricket.jpeg" },
  { id: "bassl", title: "BASSL", description: "Advanced analytics and reporting system", image: "/images/bassl.jpeg" },
] as const;

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % featuredProjects.length), 5000);
    return () => window.clearInterval(interval);
  }, []);

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + featuredProjects.length) % featuredProjects.length);
  }

  return (
    <div className="carousel-container featured-carousel-shell" role="region" aria-label="Featured projects" aria-live="polite">
      <div className="featured-carousel" style={{ transform: `translateX(-${index * 100}%)` }} aria-roledescription="carousel">
        {featuredProjects.map((project, projectIndex) => (
          <article className="featured-card" role="group" aria-label={`Slide ${projectIndex + 1} of ${featuredProjects.length}`} key={project.id}>
            <Image src={project.image} alt={`${project.title} project preview`} className="card-image" width={1500} height={850} sizes="(max-width: 768px) 92vw, 1100px" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Link href={`/project?id=${project.id}`} className="btn btn-secondary">View Project</Link>
          </article>
        ))}
      </div>
      <button className="carousel-arrow carousel-prev" type="button" aria-label="Previous project" onClick={() => move(-1)}>
        <ChevronLeft aria-hidden="true" />
      </button>
      <button className="carousel-arrow carousel-next" type="button" aria-label="Next project" onClick={() => move(1)}>
        <ChevronRight aria-hidden="true" />
      </button>
      <div className="carousel-indicators" aria-label="Choose featured project">
        {featuredProjects.map((project, projectIndex) => (
          <button
            className={`indicator ${index === projectIndex ? "active" : ""}`}
            type="button"
            aria-label={`Go to slide ${projectIndex + 1}`}
            aria-current={index === projectIndex ? "true" : undefined}
            onClick={() => setIndex(projectIndex)}
            key={project.id}
          />
        ))}
      </div>
    </div>
  );
}
