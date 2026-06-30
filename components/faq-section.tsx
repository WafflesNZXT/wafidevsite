"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

const faqs = [
  { question: "What's your typical project timeline?", topics: "timeline schedule delivery", answer: "Timeline depends on scope, but typical projects range from 5-7 days for a small site to 4-8 weeks for a large build. I provide a detailed estimate upfront." },
  { question: "Do you offer ongoing maintenance?", topics: "maintenance support updates monitoring", answer: "Yes. Maintenance packages cover security updates, backups, content changes, and performance monitoring." },
  { question: "Can you work with my existing website?", topics: "existing redesign rebuild improve", answer: "Absolutely. I can redesign, rebuild, or improve an existing website without discarding the parts that already work." },
  { question: "What about mobile responsiveness?", topics: "responsive mobile tablet devices", answer: "Responsiveness is built into every project and tested across phone, tablet, laptop, and wide desktop layouts." },
  { question: "How do you handle revisions?", topics: "revisions feedback changes", answer: "Revisions are built into the process at clear milestones, so feedback is incorporated before moving to the next phase." },
  { question: "What's the cost structure?", topics: "pricing cost budget fees", answer: "Pricing is project-based and depends on scope, complexity, and timeline. I provide a custom quote after the initial consultation." },
  { question: "Do you handle hosting and domain setup?", topics: "hosting domain ssl deployment", answer: "Yes. I can help choose hosting, configure domains and SSL, and set up a deployment workflow." },
  { question: "Can you integrate a CMS?", topics: "cms headless contentful sanity", answer: "Yes. I build custom-coded solutions and can integrate a lightweight or headless CMS when content editing is required." },
  { question: "What about SEO and performance?", topics: "seo performance speed", answer: "I implement semantic markup, structured metadata, image optimization, caching, and performance monitoring." },
  { question: "Do you provide analytics and tracking?", topics: "analytics tracking ga4 conversions", answer: "Yes. I can add privacy-friendly analytics or a full GA4 setup with conversion events." },
  { question: "How do you approach accessibility?", topics: "accessibility a11y wcag keyboard", answer: "I follow WCAG guidance, use semantic HTML, support keyboard navigation, and validate contrast and screen-reader behavior." },
  { question: "Do you support multi-language sites?", topics: "i18n multilingual translations", answer: "Yes. I can implement locale-aware routing, language controls, and translation-friendly content workflows." },
] as const;

const pageSize = 6;

export function FaqSection() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return faqs;
    return faqs.filter((faq) => `${faq.question} ${faq.topics} ${faq.answer}`.toLowerCase().includes(normalized));
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  function toggle(question: string) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  }

  return (
    <section className="faq">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-controls react-faq-controls">
          <label className="faq-search-wrap">
            <Search aria-hidden="true" />
            <span className="sr-only">Search FAQs</span>
            <input
              type="search"
              className="faq-search"
              placeholder="Search questions..."
              value={query}
              onChange={(event) => { setQuery(event.target.value); setPage(0); }}
            />
          </label>
          <div className="faq-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setOpenItems(new Set(visible.map((faq) => faq.question)))}>Expand All</button>
            <button className="btn btn-secondary" type="button" onClick={() => setOpenItems(new Set())}>Collapse All</button>
          </div>
        </div>
        <div className="faq-pagination" aria-label="FAQ pagination controls">
          <button className="btn btn-secondary" type="button" disabled={safePage === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>
            <ChevronLeft aria-hidden="true" /> Prev
          </button>
          <span className="faq-page-indicator">Page {safePage + 1} of {pageCount}</span>
          <button className="btn btn-secondary" type="button" disabled={safePage >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}>
            Next <ChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="faq-grid">
          {visible.map((faq) => {
            const open = openItems.has(faq.question);
            return (
              <article className={`faq-item ${open ? "active" : ""}`} key={faq.question}>
                <button className="faq-question" type="button" aria-expanded={open} onClick={() => toggle(faq.question)}>
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-chevron" aria-hidden="true" />
                </button>
                <div className="faq-answer" aria-hidden={!open}>
                  <div><p>{faq.answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="faq-note">Don&apos;t see your question here? <LinkToContact /></p>
      </div>
    </section>
  );
}

function LinkToContact() {
  return <a href="/hire#contact">Send me a message</a>;
}
