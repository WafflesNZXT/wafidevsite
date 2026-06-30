"use client";

import { Code2, Gauge, Paintbrush, PanelsTopLeft, ShoppingCart, Wrench } from "lucide-react";
import { useCallback, useState } from "react";
import { BuildEstimator, type EstimateSummary, type PlanName } from "@/components/build-estimator";
import { ContactForm } from "@/components/contact-form";
import { PageHero, SectionCue } from "@/components/page-primitives";
import { PricingPackages } from "@/components/pricing-packages";

const services = [
  { title: "Custom Websites", description: "Tailored web solutions built around your business goals.", icon: PanelsTopLeft },
  { title: "Web Design", description: "Modern responsive design that communicates clearly on every device.", icon: Paintbrush },
  { title: "Development", description: "Clean, maintainable code built for performance and accessibility.", icon: Code2 },
  { title: "Maintenance", description: "Ongoing support and updates to keep your website reliable.", icon: Wrench },
  { title: "E-Commerce", description: "Focused storefronts with secure checkout-ready experiences.", icon: ShoppingCart },
  { title: "Optimization", description: "Performance tuning for a faster experience and stronger SEO.", icon: Gauge },
] as const;

export function HirePage() {
  const [recommendedPlan, setRecommendedPlan] = useState<PlanName>("Advanced");
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null);
  const [currentEstimate, setCurrentEstimate] = useState<EstimateSummary | null>(null);
  const [selectedEstimate, setSelectedEstimate] = useState<EstimateSummary | null>(null);
  const handleRecommendedPlan = useCallback((plan: PlanName) => setRecommendedPlan(plan), []);
  const handleEstimateChange = useCallback((summary: EstimateSummary) => setCurrentEstimate(summary), []);

  function selectPlan(plan: PlanName) {
    setSelectedPlan(plan);
    setSelectedEstimate(currentEstimate);
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="Let's Work Together" subtitle="Ready to bring your vision to life" />
      <section className="hiring" id="hiring">
        <div className="container">
          <div className="hiring-info"><h2>How I Can Help</h2>
            <div className="services-list tsx-services-grid">
              {services.map(({ title, description, icon: Icon }) => <article className="service" key={title}><div className="service-icon"><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </div>
      </section>
      <BuildEstimator onRecommendedPlan={handleRecommendedPlan} onEstimateChange={handleEstimateChange} />
      <PricingPackages recommendedPlan={recommendedPlan} selectedPlan={selectedPlan} onSelect={selectPlan} />
      <SectionCue label="contact below" />
      <ContactForm selectedPlan={selectedPlan} estimate={selectedEstimate} />
    </main>
  );
}
