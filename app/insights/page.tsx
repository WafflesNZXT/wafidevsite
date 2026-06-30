import type { Metadata } from "next";
import { InsightsPage } from "@/components/insights-page";

export const metadata: Metadata = { title: "Website Insights", description: "Practical guidance for planning, pricing, redesigning, and improving a business website.", alternates: { canonical: "/insights" } };
export default function Page() { return <InsightsPage />; }
