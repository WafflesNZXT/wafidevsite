"use client";

import { CheckCircle2, Monitor, MousePointerClick, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-primitives";

type Viewport = "desktop" | "tablet" | "mobile";
const viewports = [{ value: "desktop", label: "Desktop", icon: Monitor }, { value: "tablet", label: "Tablet", icon: Tablet }, { value: "mobile", label: "Mobile", icon: Smartphone }] as const;

export function UiLab() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [variant, setVariant] = useState<"clarity" | "urgency">("clarity");
  const [submitted, setSubmitted] = useState(false);
  return <main id="main-content" tabIndex={-1}><PageHero title="UI Lab" subtitle="Small experiments in responsive design and useful interaction" /><section className="lab-section"><div className="container"><div className="lab-toolbar"><div><span>Preview size</span><div className="lab-segments">{viewports.map(({ value, label, icon: Icon }) => <button type="button" className={viewport === value ? "selected" : ""} aria-pressed={viewport === value} onClick={() => setViewport(value)} key={value}><Icon aria-hidden="true" /><span>{label}</span></button>)}</div></div><div><span>Message style</span><div className="lab-segments"><button type="button" className={variant === "clarity" ? "selected" : ""} aria-pressed={variant === "clarity"} onClick={() => setVariant("clarity")}>Clarity</button><button type="button" className={variant === "urgency" ? "selected" : ""} aria-pressed={variant === "urgency"} onClick={() => setVariant("urgency")}>Urgency</button></div></div></div><div className={`lab-preview ${viewport}`}><div className="lab-demo"><span className="lab-demo-label">Responsive conversion demo</span><h2>{variant === "clarity" ? "A better website starts with a clear plan." : "Turn more visitors into customers this month."}</h2><p>{variant === "clarity" ? "Define the goal, choose the right scope, and build only what your business needs." : "Improve your message, mobile experience, and calls to action without adding friction."}</p><button type="button" onClick={() => setSubmitted(true)}>{submitted ? <CheckCircle2 aria-hidden="true" /> : <MousePointerClick aria-hidden="true" />}{submitted ? "Request received" : "Request a project plan"}</button>{submitted && <span className="lab-feedback" role="status">The action confirms immediately and explains what happens next.</span>}</div></div><p className="lab-note">Change the viewport and message to see how hierarchy, wrapping, and interaction adapt without shifting the layout.</p></div></section></main>;
}
