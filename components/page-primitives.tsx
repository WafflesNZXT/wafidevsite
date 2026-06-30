import { ArrowDown } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

interface SectionCueProps {
  label: string;
}

export function SectionCue({ label }: SectionCueProps) {
  return (
    <div className="section-cue section-cue-react" aria-hidden="true">
      <ArrowDown className="section-cue-icon" />
      <span className="handwriting">{label}</span>
    </div>
  );
}
