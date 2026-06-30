import type { Metadata } from "next";
import { HirePage } from "@/components/hire-page";
export const metadata: Metadata = { title: "Hire Me", description: "Start a website project with Wafi Syed and request a custom web development quote.", alternates: { canonical: "/hire" } };
export default function Hire() { return <HirePage />; }
