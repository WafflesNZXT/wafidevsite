import type { Metadata } from "next";
import { LegacyPage } from "@/lib/legacy-page";

export const metadata: Metadata = {
  title: "Hire Me",
  description: "Start a website project with Wafi Syed and request a custom web development quote.",
  alternates: { canonical: "/hire" },
};

export default function Hire() {
  return <LegacyPage fileName="hire.html" />;
}
