import type { Metadata } from "next";
import { LegacyPage } from "@/lib/legacy-page";

export const metadata: Metadata = {
  title: "Project Details",
  description: "Detailed case studies for Wafi Syed's web development projects.",
  alternates: { canonical: "/project" },
};

export default function ProjectDetails() {
  return <LegacyPage fileName="project.html" />;
}
