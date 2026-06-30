import type { Metadata } from "next";
import { ProjectDetail } from "@/components/project-detail";
export const metadata: Metadata = { title: "Project Details", description: "Detailed case studies for Wafi Syed's web development projects.", alternates: { canonical: "/project" } };
export default function Project() { return <ProjectDetail />; }
