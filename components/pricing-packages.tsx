"use client";

import { Check, Rocket, Sprout, Trophy } from "lucide-react";
import type { PlanName } from "@/components/build-estimator";

interface PricingPackagesProps {
  recommendedPlan: PlanName;
  selectedPlan: PlanName | null;
  onSelect: (plan: PlanName) => void;
}

const packages = [
  { name: "Basic" as const, price: "$399+", timeline: "5-7 Business Days", chips: ["Starter", "Fast setup"], icon: Sprout, maintenance: "$35+/month", features: ["Up to 3 Pages", "Mobile-Responsive Design", "Basic SEO Setup", "Contact Form", "Social Media Links", "Stock Images", "Basic Security"] },
  { name: "Advanced" as const, price: "$599+", timeline: "10-14 Business Days", chips: ["Growing teams", "Popular"], icon: Rocket, maintenance: "$75+/month", features: ["Up to 6 Pages", "Mobile-Responsive Design", "Advanced SEO", "Gallery", "Advanced Inquiry Form", "Google Analytics", "Performance Optimization"] },
  { name: "Pro" as const, price: "$1,199+", timeline: "14-21 Business Days", chips: ["Full stack", "Branding"], icon: Trophy, maintenance: "$150+/month", features: ["Up to 10 Pages", "Blog or Updates Section", "Advanced SEO Strategy", "Speed & Accessibility Optimization", "Branding Consultation", "Google Analytics", "Advanced Security"] },
] as const;

export function PricingPackages({ recommendedPlan, selectedPlan, onSelect }: PricingPackagesProps) {
  return (
    <section className="pricing-section">
      <div className="container">
        <h2>Pricing Packages</h2>
        <div className="pricing-cards">
          {packages.map((tier) => {
            const Icon = tier.icon;
            const recommended = recommendedPlan === tier.name;
            return (
              <article className={`pricing-card ${tier.name === "Advanced" ? "featured" : ""} ${recommended ? "recommended" : ""}`} key={tier.name}>
                {tier.name === "Advanced" ? <div className="badge">Most Popular</div> : null}
                {recommended ? <span className="reco-label">Recommended</span> : null}
                <div className="tier-icon"><Icon aria-hidden="true" /></div>
                <h3>{tier.name}</h3><div className="price">{tier.price}</div><p className="price-desc">One-time setup &middot; {tier.timeline}</p>
                <div className="value-chips">{tier.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div>
                <ul className="price-features">{tier.features.map((feature) => <li key={feature}><Check aria-hidden="true" /> {feature}</li>)}<li className="optional-add">Optional: {tier.maintenance} Maintenance</li></ul>
                <button type="button" className="btn btn-primary select-plan-btn" onClick={() => onSelect(tier.name)}>{selectedPlan === tier.name ? "Selected" : `Choose ${tier.name}`}</button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
