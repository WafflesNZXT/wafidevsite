import type { Metadata } from "next";
import { LegacyPage } from "@/lib/legacy-page";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Wafi Syed's featured web development projects and client work.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return <LegacyPage fileName="projects.html" />;
}
