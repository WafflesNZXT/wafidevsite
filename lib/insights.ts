export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const insights: Insight[] = [
  { slug: "small-business-website-cost", title: "How Much Should a Small Business Website Cost?", excerpt: "A practical way to understand website pricing without comparing vague packages.", category: "Planning", readTime: "5 min read", sections: [
    { heading: "Price follows scope", paragraphs: ["The number of pages matters, but complexity matters more. Custom tools, payments, account systems, content management, and integrations can each change the work significantly.", "A useful estimate should separate the base website from optional features so you can see where the budget is going."] },
    { heading: "Think in business outcomes", paragraphs: ["A website that only needs to establish credibility is a different project from one expected to generate qualified leads or process sales. Start with the job the website must perform, then choose the smallest scope that can do that job well."] },
    { heading: "Leave room for refinement", paragraphs: ["Content preparation, revisions, testing, and launch support are real parts of the project. A realistic quote accounts for them instead of treating them as surprises near the end."] },
  ] },
  { slug: "prepare-before-hiring-developer", title: "What to Prepare Before Hiring a Web Developer", excerpt: "The few decisions that make discovery faster and your final website stronger.", category: "Client guide", readTime: "4 min read", sections: [
    { heading: "Define one primary goal", paragraphs: ["Choose the most important action a visitor should take: request a quote, book a service, buy a product, or understand a new offer. This gives every design decision a clear purpose."] },
    { heading: "Gather your raw material", paragraphs: ["Bring your logo, brand colors, service descriptions, photos, testimonials, and examples of sites you like. They do not need to be perfectly organized; they only need to reveal the direction and content available."] },
    { heading: "Know your constraints", paragraphs: ["Share your preferred launch window, realistic budget, required tools, and who will approve the work. Honest constraints create a better plan than an artificially broad brief."] },
  ] },
  { slug: "redesign-or-rebuild", title: "Redesign or Rebuild: How to Decide", excerpt: "A simple framework for deciding whether your current website needs polish or a new foundation.", category: "Strategy", readTime: "4 min read", sections: [
    { heading: "Redesign when the foundation works", paragraphs: ["If the site is fast, maintainable, and structurally sound, updated messaging and interface work may be enough. A redesign preserves the underlying system while improving how visitors experience it."] },
    { heading: "Rebuild when limitations compound", paragraphs: ["Frequent breakage, poor mobile behavior, slow performance, outdated dependencies, and hard-to-edit content often point to a deeper problem. Repeated cosmetic fixes can cost more than replacing a weak foundation."] },
    { heading: "Audit before deciding", paragraphs: ["Measure the current experience before committing either way. Performance, accessibility, conversion clarity, and technical condition provide evidence for the decision instead of relying on taste alone."] },
  ] },
  { slug: "what-makes-websites-convert", title: "What Actually Makes a Website Convert", excerpt: "Clear messaging and low-friction decisions matter more than visual tricks.", category: "Conversion", readTime: "5 min read", sections: [
    { heading: "Clarity comes first", paragraphs: ["Visitors should quickly understand what you offer, who it is for, and why it matters. Beautiful design cannot rescue unclear positioning, but good design can make a clear offer much easier to trust."] },
    { heading: "Proof reduces uncertainty", paragraphs: ["Relevant work, specific testimonials, transparent process, and useful case studies answer the questions visitors hesitate to ask. The strongest proof is close to the claim it supports."] },
    { heading: "Make the next step easy", paragraphs: ["Use one obvious primary action, ask only for information you need, and explain what happens after submission. Conversion improves when moving forward feels predictable."] },
  ] },
];

export const insightBySlug = Object.fromEntries(insights.map((insight) => [insight.slug, insight])) as Record<string, Insight>;
