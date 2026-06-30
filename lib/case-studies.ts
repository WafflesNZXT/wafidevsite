export interface CaseStudy {
  slug: string;
  client: string;
  category: string;
  headline: string;
  summary: string;
  image: string;
  imageClassName?: string;
  challenge: string;
  approach: string[];
  solution: string;
  outcome: string;
  services: string[];
  deliverables: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "inobex",
    client: "INOBEX",
    category: "Business intelligence",
    headline: "Making an advanced AI platform easier to understand",
    summary: "A clearer, more polished product presence for an AI-powered business intelligence platform.",
    image: "/images/inobex.jpeg",
    challenge: "INOBEX needed to communicate predictive analytics, cloud infrastructure, and real-time dashboards without overwhelming business buyers with technical detail.",
    approach: [
      "Organize the product story around practical business outcomes.",
      "Create a clear hierarchy for capabilities, trust signals, and calls to action.",
      "Build a responsive presentation that remains easy to scan across devices.",
    ],
    solution: "The experience uses focused messaging, restrained visual structure, and reusable sections to turn a complex technical offering into a more approachable product narrative.",
    outcome: "INOBEX gained a professional digital foundation that presents its capabilities clearly and can grow alongside new services, demonstrations, and customer proof.",
    services: ["Product positioning", "Responsive web design", "Frontend development"],
    deliverables: ["Information architecture", "Interface system", "Responsive website"],
  },
  {
    slug: "audo",
    client: "Audo",
    category: "Founder-led product",
    headline: "Giving an early product a focused, confident identity",
    summary: "A clean digital product direction designed to explain value quickly and feel credible from the first interaction.",
    image: "/images/audo-logo-white.png",
    imageClassName: "case-logo-image",
    challenge: "Audo needed a product experience that could introduce a new idea clearly, establish trust, and leave enough flexibility for the product to evolve.",
    approach: [
      "Reduce the experience to the clearest product story and primary actions.",
      "Establish a consistent visual language around the existing identity.",
      "Design flexible components that can support future product content.",
    ],
    solution: "The direction pairs confident typography, direct messaging, and a compact component system so visitors can understand the product without unnecessary friction.",
    outcome: "Audo now has a cohesive foundation for communicating its value, validating the product direction, and expanding the experience as the company develops.",
    services: ["Product strategy", "UI direction", "Responsive experience"],
    deliverables: ["Product narrative", "Visual system", "Responsive interface direction"],
  },
  {
    slug: "tutorly",
    client: "Tutorly",
    category: "Education technology",
    headline: "Turning a complex learning idea into a simple experience",
    summary: "A friendly, structured product direction for a learning platform built around clarity and momentum.",
    image: "/images/tutorly-logo.png",
    imageClassName: "case-logo-image",
    challenge: "Tutorly needed to make a broad learning concept feel approachable while keeping the experience organized for students, tutors, and future product features.",
    approach: [
      "Prioritize the core learning journey before secondary features.",
      "Use familiar interaction patterns to reduce the learning curve.",
      "Create a warm but professional interface that can scale with the platform.",
    ],
    solution: "The product direction uses a clear content hierarchy, purposeful actions, and a reusable interface language to keep learning tasks understandable and focused.",
    outcome: "Tutorly has a flexible experience foundation that can support validation, onboarding, and future learning workflows without losing simplicity.",
    services: ["UX planning", "Interface design", "Product structure"],
    deliverables: ["Core user flow", "Component direction", "Responsive product concept"],
  },
];

export const caseStudyBySlug = Object.fromEntries(caseStudies.map((study) => [study.slug, study])) as Record<string, CaseStudy>;
