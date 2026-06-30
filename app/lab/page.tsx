import type { Metadata } from "next";
import { UiLab } from "@/components/ui-lab";

export const metadata: Metadata = { title: "UI Lab", description: "Interactive responsive design and conversion interface experiments by Wafi Syed.", alternates: { canonical: "/lab" } };
export default function Page() { return <UiLab />; }
