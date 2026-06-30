"use client";

import { CalendarDays, Check, Copy, Download, Layers3, Link2, Minus, Plus, RotateCcw, Sparkles, WalletCards } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export type PlanName = "Basic" | "Advanced" | "Pro";
type Complexity = "basic" | "advanced" | "pro";
type Design = "minimal" | "standard" | "polished";
type Speed = "flexible" | "standard" | "rush";
type Feature = keyof typeof featureCosts;
type MaintenanceLevel = "low" | "standard" | "major";

export interface EstimateSummary {
  plan: PlanName;
  cost: number;
  days: number;
  pages: number;
  complexity: string;
  features: string[];
  design: string;
  speed: string;
  revisions: number;
  maintenance: { level: string; monthly: number } | null;
}

interface BuildEstimatorProps {
  onRecommendedPlan: (plan: PlanName) => void;
  onEstimateChange: (summary: EstimateSummary) => void;
}

const basePricing = {
  basic: { price: 399, days: 6, includedPages: 3, extraPerPage: 60 },
  advanced: { price: 599, days: 12, includedPages: 6, extraPerPage: 50 },
  pro: { price: 1199, days: 18, includedPages: 10, extraPerPage: 40 },
} as const;

const featureCosts = { auth: 120, payments: 180, blog: 120, cms: 160, analytics: 60, ecommerce: 220 } as const;
const featureLabels = { auth: "User Accounts / Auth", payments: "Payments / Checkout", blog: "Blog / Updates", cms: "CMS / Admin", analytics: "Analytics", ecommerce: "E-commerce" } as const;
const designMultiplier = { minimal: 1, standard: 1.1, polished: 1.25 } as const;
const speedMultiplier = { flexible: 0.95, standard: 1, rush: 1.2 } as const;
const maintenanceOptions = [
  { value: "low", label: "Low", price: 35, description: "Small monthly changes", example: "Colors, discounts, or copy updates" },
  { value: "standard", label: "Standard", price: 75, description: "Steady site improvements", example: "Low updates plus a new section" },
  { value: "major", label: "Major", price: 150, description: "Frequent content work", example: "Menus, recurring pages, or major updates" },
] as const;
const complexityOptions = [
  { value: "basic", label: "Basic", description: "Focused essentials" },
  { value: "advanced", label: "Advanced", description: "More custom features" },
  { value: "pro", label: "Pro", description: "Complex product build" },
] as const;
const designOptions = [
  { value: "minimal", label: "Minimal" },
  { value: "standard", label: "Standard" },
  { value: "polished", label: "Polished" },
] as const;
const speedOptions = [
  { value: "flexible", label: "Flexible" },
  { value: "standard", label: "Standard" },
  { value: "rush", label: "Rush" },
] as const;

function useAnimatedNumber(value: number) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const from = previousValue.current;
    previousValue.current = value;

    if (from === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const duration = 520;
    const startedAt = performance.now();
    let frame = 0;

    function update(now: number) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + (value - from) * eased));
      if (progress < 1) frame = window.requestAnimationFrame(update);
    }

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return displayValue;
}

export function BuildEstimator({ onRecommendedPlan, onEstimateChange }: BuildEstimatorProps) {
  const [pages, setPages] = useState(5);
  const [customPageInput, setCustomPageInput] = useState("");
  const [complexity, setComplexity] = useState<Complexity>("advanced");
  const [features, setFeatures] = useState<Feature[]>(["analytics"]);
  const [design, setDesign] = useState<Design>("standard");
  const [speed, setSpeed] = useState<Speed>("standard");
  const [revisions, setRevisions] = useState(2);
  const [maintenance, setMaintenance] = useState(false);
  const [maintenanceLevel, setMaintenanceLevel] = useState<MaintenanceLevel>("standard");
  const [estimateCopied, setEstimateCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const encoded = new URL(window.location.href).searchParams.get("estimate");
    if (!encoded) return;
    try {
      const padded = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
      const saved = JSON.parse(window.atob(padded)) as Record<string, unknown>;
      const validComplexity = complexityOptions.some((option) => option.value === saved.complexity);
      const validDesign = designOptions.some((option) => option.value === saved.design);
      const validSpeed = speedOptions.some((option) => option.value === saved.speed);
      const validFeatures = Array.isArray(saved.features) ? saved.features.filter((feature): feature is Feature => typeof feature === "string" && feature in featureCosts) : [];
      const validMaintenance = maintenanceOptions.some((option) => option.value === saved.maintenanceLevel);
      setPages(Math.min(40, Math.max(1, Number(saved.pages) || 5)));
      if (Number(saved.pages) > 20) setCustomPageInput(String(Math.min(40, Number(saved.pages))));
      if (validComplexity) setComplexity(saved.complexity as Complexity);
      if (validDesign) setDesign(saved.design as Design);
      if (validSpeed) setSpeed(saved.speed as Speed);
      setFeatures(validFeatures);
      setRevisions(Math.min(6, Math.max(1, Number(saved.revisions) || 2)));
      setMaintenance(Boolean(saved.maintenance));
      if (validMaintenance) setMaintenanceLevel(saved.maintenanceLevel as MaintenanceLevel);
      setRestored(true);
    } catch {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const estimate = useMemo(() => {
    const base = basePricing[complexity];
    const extraPages = Math.max(0, pages - base.includedPages);
    const featureCost = features.reduce((total, feature) => total + featureCosts[feature], 0);
    const revisionCost = Math.max(0, revisions - 2) * 75;
    const cost = Math.round((base.price + extraPages * base.extraPerPage + featureCost + revisionCost) * designMultiplier[design] * speedMultiplier[speed]);
    let days = base.days + Math.ceil(extraPages * 0.8) + Math.ceil(features.length * 0.7) + Math.ceil(Math.max(0, revisions - 2) / 2);
    if (speed === "rush") days = Math.max(5, Math.round(days * 0.85));
    if (speed === "flexible") days = Math.round(days * 1.1);
    const plan: PlanName = cost < 500 ? "Basic" : cost <= 1000 ? "Advanced" : "Pro";
    const monthly = maintenance ? maintenanceOptions.find((option) => option.value === maintenanceLevel)?.price ?? 0 : 0;
    return { base, extraPages, cost, days, plan, monthly };
  }, [complexity, design, features, maintenance, maintenanceLevel, pages, revisions, speed]);
  const animatedCost = useAnimatedNumber(estimate.cost);
  const summary = useMemo<EstimateSummary>(() => ({
    plan: estimate.plan,
    cost: estimate.cost,
    days: estimate.days,
    pages,
    complexity,
    features: features.map((feature) => featureLabels[feature]),
    design,
    speed,
    revisions,
    maintenance: maintenance ? { level: maintenanceLevel, monthly: estimate.monthly } : null,
  }), [complexity, design, estimate.cost, estimate.days, estimate.monthly, estimate.plan, features, maintenance, maintenanceLevel, pages, revisions, speed]);
  const estimateText = useMemo(() => [
    "Wafi Syed - Website Build Estimate",
    "",
    `Suggested plan: ${summary.plan}`,
    `Estimated project cost: $${summary.cost.toLocaleString()}`,
    `Estimated timeline: ${summary.days} days`,
    `Pages: ${summary.pages}`,
    `Complexity: ${summary.complexity}`,
    `Features: ${summary.features.length ? summary.features.join(", ") : "None selected"}`,
    `Design polish: ${summary.design}`,
    `Delivery pace: ${summary.speed}`,
    `Revision rounds: ${summary.revisions}`,
    `Monthly maintenance: ${summary.maintenance ? `${summary.maintenance.level} ($${summary.maintenance.monthly}/month)` : "Not selected"}`,
    "",
    "This is a planning estimate, not a final quote. Final pricing is confirmed after project discovery.",
  ].join("\n"), [summary]);

  useEffect(() => onRecommendedPlan(estimate.plan), [estimate.plan, onRecommendedPlan]);
  useEffect(() => onEstimateChange(summary), [onEstimateChange, summary]);
  useEffect(() => {
    if (!estimateCopied) return;
    const timer = window.setTimeout(() => setEstimateCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [estimateCopied]);
  useEffect(() => {
    if (!linkCopied) return;
    const timer = window.setTimeout(() => setLinkCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [linkCopied]);

  function toggleFeature(feature: Feature) {
    setFeatures((current) => current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]);
  }

  function reset() {
    setPages(5); setCustomPageInput(""); setComplexity("advanced"); setFeatures(["analytics"]); setDesign("standard"); setSpeed("standard"); setRevisions(2); setMaintenance(false); setMaintenanceLevel("standard");
  }

  function updatePageSlider(value: number) {
    setPages(value);
    if (value < 20) setCustomPageInput("");
  }

  function updateCustomPages(value: string) {
    setCustomPageInput(value);
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed >= 21 && parsed <= 40) setPages(parsed);
  }

  async function copyEstimate() {
    await navigator.clipboard.writeText(estimateText);
    setEstimateCopied(true);
  }

  function downloadEstimate() {
    const file = new Blob([estimateText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wafi-syed-website-estimate.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyEstimateLink() {
    const saved = { pages, complexity, features, design, speed, revisions, maintenance, maintenanceLevel };
    const encoded = window.btoa(JSON.stringify(saved)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const url = new URL(window.location.href);
    url.searchParams.set("estimate", encoded);
    url.hash = "";
    window.history.replaceState({}, "", url);
    await navigator.clipboard.writeText(url.href);
    setLinkCopied(true);
  }

  return (
    <section className="pricing-section build-estimator">
      <div className="container">
        <div className="estimator-heading">
          <div>
            <span className="estimator-eyebrow"><Sparkles aria-hidden="true" /> Instant project range</span>
            <h2>Build Estimator</h2>
            <p>Adjust the options to get a practical starting range for your website.</p>
          </div>
          <button type="button" className="estimator-reset" onClick={reset}><RotateCcw aria-hidden="true" /> Reset</button>
        </div>

        <div className="estimator-shell">
          <form className="estimator-form" onSubmit={(event) => event.preventDefault()}>
            <section className="estimator-group" aria-labelledby="estimator-scope-title">
              <h3 className="estimator-step-title" id="estimator-scope-title"><span>1</span> Project scope</h3>
              <div className="pages-label">
                <label htmlFor="pagesCount">Number of pages</label>
                <output htmlFor="pagesCount">{pages} {pages === 1 ? "page" : "pages"}</output>
              </div>
              <input type="range" id="pagesCount" min="1" max="20" value={Math.min(pages, 20)} onChange={(event) => updatePageSlider(Number(event.target.value))} style={{ "--range-progress": `${((Math.min(pages, 20) - 1) / 19) * 100}%` } as React.CSSProperties} />
              <div className="range-labels" aria-hidden="true"><span>1</span><span>20+</span></div>
              {pages >= 20 ? (
                <div className="custom-pages-prompt">
                  <div><strong>Need more than 20 pages?</strong><span>Enter a custom total, up to 40.</span></div>
                  <label htmlFor="customPages"><span className="sr-only">Custom number of pages</span><input id="customPages" type="number" min="21" max="40" inputMode="numeric" placeholder="21-40" value={customPageInput} onChange={(event) => updateCustomPages(event.target.value)} /></label>
                </div>
              ) : null}

              <span className="control-label">Complexity</span>
              <div className="complexity-options">
                {complexityOptions.map((option) => (
                  <button type="button" className={complexity === option.value ? "selected" : ""} aria-pressed={complexity === option.value} onClick={() => setComplexity(option.value)} key={option.value}>
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="estimator-group" aria-labelledby="estimator-features-title">
              <h3 className="estimator-step-title" id="estimator-features-title"><span>2</span> Add features</h3>
              <div className="feature-list">
                {(Object.entries(featureLabels) as [Feature, string][]).map(([value, label]) => {
                  const selected = features.includes(value);
                  return (
                    <label className={selected ? "selected" : ""} key={value}>
                      <input type="checkbox" checked={selected} onChange={() => toggleFeature(value)} />
                      <span className="feature-check"><Check aria-hidden="true" /></span>
                      <span>{label}</span>
                      <small>+${featureCosts[value]}</small>
                    </label>
                  );
                })}
              </div>
            </section>

            <section className="estimator-group" aria-labelledby="estimator-finish-title">
              <h3 className="estimator-step-title" id="estimator-finish-title"><span>3</span> Finish and timeline</h3>
              <span className="control-label">Design polish</span>
              <div className="segmented-control">
                {designOptions.map((option) => <button type="button" className={design === option.value ? "selected" : ""} aria-pressed={design === option.value} onClick={() => setDesign(option.value)} key={option.value}>{option.label}</button>)}
              </div>
              <span className="control-label">Delivery pace</span>
              <div className="segmented-control">
                {speedOptions.map((option) => <button type="button" className={speed === option.value ? "selected" : ""} aria-pressed={speed === option.value} onClick={() => setSpeed(option.value)} key={option.value}>{option.label}</button>)}
              </div>
              <div className="revision-control">
                <div><span className="control-label">Revision rounds</span><small>Two rounds included; additional rounds add $75.</small></div>
                <div className="revision-stepper" aria-label="Revision rounds">
                  <button type="button" aria-label="Decrease revision rounds" disabled={revisions <= 1} onClick={() => setRevisions((current) => Math.max(1, current - 1))}><Minus aria-hidden="true" /></button>
                  <output aria-live="polite">{revisions}</output>
                  <button type="button" aria-label="Increase revision rounds" disabled={revisions >= 6} onClick={() => setRevisions((current) => Math.min(6, current + 1))}><Plus aria-hidden="true" /></button>
                </div>
              </div>
              <label className="maintenance-toggle">
                <span><strong>Ongoing maintenance</strong><small>Updates, monitoring, and support</small></span>
                <input type="checkbox" checked={maintenance} onChange={(event) => setMaintenance(event.target.checked)} />
                <span className="toggle-track" aria-hidden="true"><span /></span>
              </label>
              {maintenance ? (
                <div className="maintenance-levels">
                  {maintenanceOptions.map((option) => (
                    <button type="button" className={maintenanceLevel === option.value ? "selected" : ""} aria-pressed={maintenanceLevel === option.value} onClick={() => setMaintenanceLevel(option.value)} key={option.value}>
                      <span><strong>{option.label}</strong><b>${option.price}/mo</b></span>
                      <small>{option.description}</small>
                      <em>{option.example}</em>
                    </button>
                  ))}
                </div>
              ) : null}
            </section>
          </form>

          <aside className="estimator-result" aria-live="polite">
            <span className="result-kicker">Your estimate</span>
            <div className="result-price">${animatedCost.toLocaleString()}</div>
            <p className="result-caption">Estimated project total</p>
            <dl className="result-details">
              <div><dt><CalendarDays aria-hidden="true" /> Timeline</dt><dd>{estimate.days} days</dd></div>
              <div><dt><Layers3 aria-hidden="true" /> Suggested plan</dt><dd className="result-value-change" key={estimate.plan}>{estimate.plan}</dd></div>
              {maintenance && <div className="maintenance-result" key={estimate.monthly}><dt><WalletCards aria-hidden="true" /> Maintenance</dt><dd>${estimate.monthly}/mo</dd></div>}
            </dl>
            <div className="result-breakdown">
              <strong>Included in this range</strong>
              <ul>
                <li><Check aria-hidden="true" /><span>{pages} pages, {complexity} complexity</span></li>
                <li><Check aria-hidden="true" /><span>{features.length ? features.map((feature) => featureLabels[feature]).join(", ") : "No added features"}</span></li>
                <li><Check aria-hidden="true" /><span>{design} design, {speed} delivery, {revisions} revision {revisions === 1 ? "round" : "rounds"}</span></li>
              </ul>
            </div>
            <div className="estimate-share-block">
              <span className="estimate-actions-label">Keep or share this estimate</span>
              <div className="estimate-share-actions">
                <button type="button" className="save-estimate-action" onClick={copyEstimateLink}>{linkCopied ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />} {linkCopied ? "Link Copied" : "Save Estimate Link"}</button>
                <button type="button" onClick={copyEstimate}>{estimateCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} {estimateCopied ? "Copied" : "Copy Summary"}</button>
                <button type="button" onClick={downloadEstimate}><Download aria-hidden="true" /> Download File</button>
              </div>
            </div>
            {restored && <p className="estimate-restored"><Check aria-hidden="true" /> Saved estimate restored</p>}
            <p className="estimator-note">A planning estimate, not a final quote. We&apos;ll confirm the exact scope together.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
