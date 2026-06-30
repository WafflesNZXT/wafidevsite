import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
export const metadata: Metadata = { title: "About", description: "Learn about Wafi Syed, a front-end and UX developer building polished web experiences.", alternates: { canonical: "/about" } };
export default function About() { return <AboutPage />; }
