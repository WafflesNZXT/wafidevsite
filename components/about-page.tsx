import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, EyeOff, Gauge, Leaf, ListTree, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHero, SectionCue } from "@/components/page-primitives";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "25+", label: "Projects Completed" },
  { value: "25+", label: "Happy Clients" },
  { value: "100%", label: "Satisfaction Focus" },
] as const;

const badges = [
  { title: "Accessibility", meta: "WCAG AA", icon: CheckCircle2 },
  { title: "Performance", meta: "Lighthouse 90+", icon: Gauge },
  { title: "Security", meta: "HTTPS + HSTS", icon: LockKeyhole },
  { title: "Privacy", meta: "No invasive trackers", icon: EyeOff },
  { title: "SEO", meta: "Structured metadata", icon: ListTree },
  { title: "PWA", meta: "Offline-ready basics", icon: ShieldCheck },
  { title: "Green Hosting", meta: "Low-impact footprint", icon: Leaf },
] as const;

const universeImages = [
  "20250805_115057.jpg",
  "20250928_185341.jpg",
  "20251013_133305.jpg",
  "20251018_121243.jpg",
  "DJI_20250806_165325_170.jpg",
  "WhatsApp Image 2025-12-30 at 10.14.49 PM.jpeg",
  "WhatsApp Image 2025-12-30 at 10.16.50 PM.jpeg",
] as const;

export function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="About Me" subtitle="Get to know the developer behind the code" />
      <section className="about" id="about">
        <div className="container">
          <div className="about-content tsx-about-grid">
            <div className="about-text">
              <div className="about-intro tsx-about-intro">
                <div className="about-text-content">
                  <h2>Hi, I&apos;m a Web Developer!</h2>
                  <p>With a passion for creating beautiful, functional, and user-friendly web experiences, I&apos;ve dedicated myself to mastering the craft of web development. Every project is an opportunity to learn, innovate, and deliver excellence.</p>
                </div>
                <div className="about-image">
                  <Image src="/images/wafisyedlogoface.jpg" alt="Wafi Syed" className="profile-pic" width={460} height={460} priority />
                </div>
              </div>
              <h3>My Journey</h3>
              <p>Starting with curiosity about how websites work, I&apos;ve evolved into a full-stack developer capable of bringing complex ideas to life. From frontend design to backend architecture, I enjoy every part of the process.</p>
              <h3>What I Do</h3>
              <p>I specialize in responsive, performant websites that look polished and provide an exceptional user experience. My focus is clean, maintainable code and practical design decisions.</p>
              <div className="experience-grid">
                {stats.map((stat) => <div className="experience-item" key={stat.label}><div className="experience-number">{stat.value}</div><p>{stat.label}</p></div>)}
              </div>
            </div>
            <aside className="about-sidebar">
              <div className="tech-stack">
                <h3>Tech Stack</h3>
                <div className="tech-categories">
                  <div className="tech-category"><h4>Frontend</h4><ul><li>Next.js</li><li>TypeScript</li><li>React</li><li>CSS</li></ul></div>
                  <div className="tech-category"><h4>Backend</h4><ul><li>Node.js</li><li>APIs</li><li>Databases</li><li>Email services</li></ul></div>
                  <div className="tech-category"><h4>Tools</h4><ul><li>Git / GitHub</li><li>VS Code</li><li>Supabase</li><li>Neon</li><li>Canva</li><li>Vercel</li></ul></div>
                </div>
              </div>
              <div className="badge-wall compact">
                <h2>Badge Wall</h2><p className="section-subtitle">Verified standards and practices</p>
                <ul className="badge-grid tsx-badge-grid" role="list">
                  {badges.map(({ title, meta, icon: Icon }) => (
                    <li className="badge-item" key={title}><div className="badge-icon"><Icon aria-hidden="true" /></div><div className="badge-text"><span className="badge-title">{title}</span><span className="badge-meta">{meta}</span></div></li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SectionCue label="my universe" />
      <section className="my-universe" id="my-universe">
        <div className="container">
          <h2>My Universe</h2><p className="section-subtitle">A glimpse into my world and inspirations</p>
          <div className="universe-collage">
            {universeImages.map((image, index) => (
              <div className={`collage-item item-${index + 1}`} key={image}><Image src={`/images/${image}`} alt={`Universe moment ${index + 1}`} width={900} height={900} sizes="(max-width: 768px) 48vw, 320px" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="container"><h2>What Clients Say</h2><TestimonialsCarousel /></div>
      </section>
      <section className="cta"><div className="container"><h2>Let&apos;s create something amazing together.</h2><Link href="/hire" className="btn btn-primary">Get in Touch</Link></div></section>
    </main>
  );
}
