"use client";

import Image from "next/image";
import { ArrowUpRight, ScanSearch } from "lucide-react";
import { useState, type FormEvent } from "react";

export function AudoAuditHandoff() {
  const [siteUrl, setSiteUrl] = useState("");
  const [error, setError] = useState("");

  function startAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const normalized = new URL(siteUrl.includes("://") ? siteUrl : `https://${siteUrl}`);
      if (!["http:", "https:"].includes(normalized.protocol)) throw new Error();
      window.open(`https://www.useaudo.com/?url=${encodeURIComponent(normalized.href)}&source=wafisyed.dev`, "_blank", "noopener,noreferrer");
      setError("");
    } catch {
      setError("Enter a valid website address, such as example.com.");
    }
  }

  return (
    <section className="audo-handoff">
      <div className="container audo-handoff-inner">
        <div className="audo-mark"><Image src="/images/audo-logo-white.png" alt="Audo" width={180} height={90} /></div>
        <div className="audo-copy"><span><ScanSearch aria-hidden="true" /> Already have a website?</span><h2>See what your current site needs first.</h2><p>Run it through Audo for a focused review of conversion, UX, accessibility, SEO, and performance.</p></div>
        <form onSubmit={startAudit} noValidate>
          <label htmlFor="audit-url">Website address</label>
          <div><input id="audit-url" type="url" inputMode="url" placeholder="yourwebsite.com" value={siteUrl} onChange={(event) => setSiteUrl(event.target.value)} required /><button type="submit">Audit with Audo <ArrowUpRight aria-hidden="true" /></button></div>
          {error && <p role="alert">{error}</p>}
        </form>
      </div>
    </section>
  );
}
