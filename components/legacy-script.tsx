"use client";

import { useEffect } from "react";

type PortfolioWindow = Window & { __portfolioInitialized?: boolean };

export function LegacyScript() {
  useEffect(() => {
    const priorScript = document.querySelector<HTMLScriptElement>("script[data-portfolio-legacy='true']");
    priorScript?.remove();

    (window as PortfolioWindow).__portfolioInitialized = false;

    const script = document.createElement("script");
    script.src = "/script.js?v=responsive-icons";
    script.async = false;
    script.dataset.portfolioLegacy = "true";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
