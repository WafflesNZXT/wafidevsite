import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/case-studies-page";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore selected product and web case studies by Wafi Syed.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudies() {
  return <CaseStudiesPage />;
}
