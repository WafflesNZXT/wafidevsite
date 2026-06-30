import Link from "next/link";
import { ArrowDown, ArrowRight, Code2, FlaskConical, Gauge, MonitorSmartphone, Palette, PenTool, Rocket, Search } from "lucide-react";
import { AudoAuditHandoff } from "@/components/audo-audit-handoff";
import { ClientsCarousel } from "@/components/clients-carousel";
import { FaqSection } from "@/components/faq-section";
import { FeaturedCarousel } from "@/components/featured-carousel";

const skills = [
  { title: "UI/UX Design", description: "Beautiful and intuitive user interfaces", icon: Palette },
  { title: "Performance", description: "Fast, optimized web experiences", icon: Gauge },
  { title: "Responsive", description: "Purpose-built layouts for every device", icon: MonitorSmartphone },
  { title: "Development", description: "Clean, maintainable, and scalable code", icon: Code2 },
] as const;

const process = [
  { number: "01", title: "Discovery & Planning", description: "We clarify your vision, goals, audience, and the exact outcomes the website needs to create.", icon: Search },
  { number: "02", title: "Design & Wireframes", description: "I create a clear visual direction and responsive layouts before committing to the build.", icon: PenTool },
  { number: "03", title: "Development", description: "The design becomes clean, efficient code with accessibility and performance built in.", icon: Code2 },
  { number: "04", title: "Testing & Launch", description: "The final experience is tested, refined, deployed, and ready for real visitors.", icon: Rocket },
] as const;

export function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero react-hero">
        <div className="hero-content">
          <h1 className="hero-title">Web Development <span className="gradient-text">Expertise</span></h1>
          <p className="hero-subtitle">Crafting polished, responsive websites that engage visitors and help businesses grow.</p>
          <div className="hero-buttons">
            <Link href="/projects" className="btn btn-primary">View Projects</Link>
            <Link href="/hire" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
        <div className="hero-graphic" aria-label="Code sample">
          <div className="code-block">
            <div className="code-header" aria-hidden="true">
              <span className="code-dot red" /><span className="code-dot yellow" /><span className="code-dot green" />
            </div>
            <pre><code>{`const portfolio = {
  stack: ['Next.js', 'TypeScript'],
  focus: 'Thoughtful web experiences'
}`}</code></pre>
          </div>
        </div>
        <a href="#featured" className="scroll-cue react-scroll-cue" aria-label="Scroll to featured work">
          <ArrowDown aria-hidden="true" />
          <span className="handwriting">there&apos;s more</span>
        </a>
      </section>

      <section className="featured" id="featured">
        <div className="container"><h2>Featured Works</h2><FeaturedCarousel /></div>
      </section>

      <section className="clients" id="clients">
        <div className="container"><h2>Trusted by Clients</h2><ClientsCarousel /></div>
      </section>

      <AudoAuditHandoff />

      <section className="skills">
        <div className="container">
          <h2>Technologies & Skills</h2>
          <div className="tsx-card-grid">
            {skills.map(({ title, description, icon: Icon }) => (
              <article className="stack-card" key={title}>
                <div className="skill-icon"><Icon aria-hidden="true" /></div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta cta-secondary">
        <div className="container">
          <h2>Let&apos;s Collaborate and Create Something Extraordinary</h2>
          <p className="cta-subtitle">Your next project deserves careful design and a developer who cares about the outcome.</p>
          <Link href="/hire" className="btn btn-primary">Start Your Project</Link>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <h2>How I Work</h2>
          <p className="process-intro">A clear path from the first conversation to a confident launch.</p>
          <ol className="process-timeline">
            {process.map(({ number, title, description, icon: Icon }) => (
              <li key={number}>
                <div className="process-marker"><Icon aria-hidden="true" /></div>
                <span className="process-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lab-invite">
        <div className="container">
          <FlaskConical aria-hidden="true" />
          <div><h2>Try the UI Lab</h2><p>Change viewport sizes, compare messaging, and test the small interactions that make an interface feel finished.</p></div>
          <Link href="/lab">Open UI Lab <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <FaqSection />

      <section className="cta">
        <div className="container">
          <h2>Ready to bring your ideas to life?</h2>
          <p className="cta-subtitle">Let&apos;s turn your vision into a polished web experience.</p>
          <Link href="/hire" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </main>
  );
}
