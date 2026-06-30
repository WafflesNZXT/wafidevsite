export interface TimelineStep {
  date: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Business" | "E-commerce" | "Web Apps" | "Education" | "Wellness";
  subtitle: string;
  image: string;
  description: string;
  cardDescription: string;
  tags: string[];
  link: string;
  timeline: TimelineStep[];
}

export const projects: Project[] = [
  {
    id: "haider-cricket",
    title: "Haider Cricket",
    category: "E-commerce",
    subtitle: "E-commerce platform for cricket gear",
    image: "/images/haider-cricket.jpeg",
    description: "Professional cricket gear store with custom jersey designer, premium equipment, and fast delivery for teams. Showcase of bats, gloves, protection gear, and footwear.",
    cardDescription: "Professional cricket gear e-commerce platform with a custom jersey designer, premium equipment, and fast delivery for cricket teams.",
    tags: ["E-Commerce", "Custom Design", "Responsive"],
    link: "https://wafflesnzxt.github.io/HaiderCricket/",
    timeline: [
      { date: "Week 1", title: "Discovery & Scope", description: "Aligned requirements, product catalog, and brand direction." },
      { date: "Week 2", title: "Storefront Build", description: "Implemented product listings and responsive layouts." },
      { date: "Week 3", title: "Customizer & QA", description: "Added the jersey designer and completed quality assurance." },
    ],
  },
  {
    id: "inobex",
    title: "INOBEX",
    category: "Business",
    subtitle: "AI-powered business intelligence",
    image: "/images/inobex.jpeg",
    description: "Predictive analytics platform with scalable cloud infrastructure and real-time dashboards for data-driven decision making.",
    cardDescription: "AI-powered business intelligence platform with predictive analytics, scalable cloud infrastructure, and real-time dashboards.",
    tags: ["AI/ML", "Dashboard", "Enterprise"],
    link: "http://inobex.com/",
    timeline: [
      { date: "Phase 1", title: "Data Modeling", description: "Defined metrics and ingestion pipelines." },
      { date: "Phase 2", title: "Dashboard UX", description: "Built interactive visualizations and filters." },
      { date: "Phase 3", title: "Performance & Launch", description: "Optimized queries and deployed to production." },
    ],
  },
  {
    id: "brain-rot-dictionary",
    title: "Brain-Rot Dictionary",
    category: "Education",
    subtitle: "Interactive modern slang dictionary",
    image: "/images/brain-rot-dictionary.jpeg",
    description: "Educational platform decoding modern slang and internet terminology with searchable categories from TikTok, gaming, memes, and more.",
    cardDescription: "Interactive educational platform decoding modern slang and internet terminology through a fast, categorized search experience.",
    tags: ["Interactive", "Educational", "Search"],
    link: "https://wafflesnzxt.github.io/Brain-Rot-Dictionary/",
    timeline: [
      { date: "Sprint 1", title: "Schema & Terms", description: "Curated categories and term metadata." },
      { date: "Sprint 2", title: "Search & Filters", description: "Implemented fast client-side search and tagging." },
      { date: "Sprint 3", title: "Polish", description: "Refined UX and accessibility." },
    ],
  },
  {
    id: "bassl",
    title: "BASSL",
    category: "Web Apps",
    subtitle: "Modern web platform",
    image: "/images/bassl.jpeg",
    description: "Comprehensive web platform featuring modern design, seamless user experience, and professional branding.",
    cardDescription: "Comprehensive web platform with modern design, smooth navigation, and professional business branding.",
    tags: ["Web App", "Design", "UX"],
    link: "https://wafflesnzxt.github.io/BASSL/",
    timeline: [
      { date: "Design", title: "Brand & UI", description: "Established the visual language and components." },
      { date: "Build", title: "Implementation", description: "Developed responsive views and navigation." },
      { date: "QA", title: "Refinement", description: "Fixed edge cases and improved performance." },
    ],
  },
  {
    id: "profilelift",
    title: "ProfileLift",
    category: "Business",
    subtitle: "Google Business Profile optimization",
    image: "/images/profilelift.jpeg",
    description: "Google Business Profile optimization with photo management, content enhancement, and performance tracking.",
    cardDescription: "Professional Google Business Profile optimization, photo management, content enhancement, and performance tracking.",
    tags: ["SaaS", "Service", "Marketing"],
    link: "https://wafflesnzxt.github.io/ProfileLift/",
    timeline: [
      { date: "Kickoff", title: "Goals & KPIs", description: "Defined optimization targets and metrics." },
      { date: "Build", title: "Service Site", description: "Implemented offerings, testimonials, and contact." },
      { date: "Iterate", title: "Analytics", description: "Added tracking and an iteration loop." },
    ],
  },
  {
    id: "zen-habit",
    title: "Zen Habit",
    category: "Wellness",
    subtitle: "Mindfulness habit app",
    image: "/images/zen-habit.jpeg",
    description: "Mindfulness and wellness app with daily micro-challenges, guided meditation, habit tracking, and progress streaks.",
    cardDescription: "Mindfulness and wellness application with daily micro-challenges, guided meditation, and progress streaks.",
    tags: ["Wellness", "Habits", "Tracking"],
    link: "https://wafflesnzxt.github.io/Zen-Habit/",
    timeline: [
      { date: "Week 1", title: "Core Flows", description: "Built habit tracking and streak logic." },
      { date: "Week 2", title: "Content", description: "Added guided meditation and prompts." },
      { date: "Week 3", title: "UX Polish", description: "Improved mobile experience and animations." },
    ],
  },
  {
    id: "imam-hussain",
    title: "Imam Hussain (as)",
    category: "Education",
    subtitle: "Educational memorial website",
    image: "/images/imam-hussain.jpeg",
    description: "Memorial site honoring the legacy of Imam Hussain with a historical timeline, Karbala narrative, quotes, and teachings.",
    cardDescription: "Educational memorial website preserving the history, teachings, and moral courage of Imam Hussain (as).",
    tags: ["Educational", "History", "Heritage"],
    link: "https://wafflesnzxt.github.io/ImamHussain.as/",
    timeline: [
      { date: "Research", title: "Content Gathering", description: "Curated historical sources and quotes." },
      { date: "Build", title: "Layout & Narrative", description: "Structured the timeline and story flow." },
      { date: "Finalize", title: "Accessibility", description: "Improved readability and contrast." },
    ],
  },
  {
    id: "car-search-engine",
    title: "Car Search Engine",
    category: "Web Apps",
    subtitle: "Advanced vehicle finder",
    image: "/images/Screenshot_30-12-2025_121048_wafflesnzxt.github.io.jpeg",
    description: "Search engine for vehicles with comprehensive filtering by price, size, seats, color, and more.",
    cardDescription: "Advanced automotive search engine with comprehensive filtering by price, size, seats, color, and more.",
    tags: ["Search Engine", "Automotive", "Filters"],
    link: "https://wafflesnzxt.github.io/CarSearchEngine/",
    timeline: [
      { date: "Planning", title: "Filter Design", description: "Defined attributes and UI for filters." },
      { date: "Build", title: "Search Engine", description: "Implemented indexing and filtering." },
      { date: "Polish", title: "Performance", description: "Optimized data and results rendering." },
    ],
  },
];

export const projectById = Object.fromEntries(projects.map((project) => [project.id, project])) as Record<string, Project>;

export const testimonials = [
  { quote: "Outstanding work! Delivered exactly what we needed, on time and within budget. Highly recommended!", author: "CEO, Inobex" },
  { quote: "Professional, creative, and incredibly responsive to feedback. A pleasure to work with!", author: "Founder, Profile Lift" },
  { quote: "The attention to detail and commitment to quality is unmatched. Exceeded all expectations!", author: "Founder, Merclay" },
  { quote: "Tutorly turned a complex learning idea into an experience that feels simple, focused, and genuinely useful.", author: "Founder, Tutorly" },
  { quote: "Audo feels fast, clear, and confident. The product experience makes it easy for users to understand the value right away.", author: "Founder, Audo" },
] as const;
