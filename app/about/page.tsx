import type { Metadata } from "next";
import { LegacyPage } from "@/lib/legacy-page";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Wafi Syed, a front-end and UX developer building polished web experiences.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <LegacyPage fileName="about.html" />;
}
