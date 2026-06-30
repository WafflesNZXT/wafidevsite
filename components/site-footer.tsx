"use client";

import Link from "next/link";
import { Check, ChevronUp, Copy } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useEffect, useState } from "react";

export function SiteFooter() {
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 360);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  async function copySiteUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <footer className="footer site-footer" id="site-footer">
        <div className="container site-footer-inner">
          <p className="footer-copyright">&copy; 2026 Wafi Syed Portfolio. Built with passion and code.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/home">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/case-studies">Case Studies</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/lab">UI Lab</Link>
            <Link href="/about">About</Link>
            <Link href="/hire">Hire Me</Link>
            <a href="https://www.useaudo.com/" target="_blank" rel="noreferrer">Audo</a>
          </nav>
          <div className="footer-actions">
            <button className="icon-btn" type="button" onClick={copySiteUrl} aria-label="Copy site URL">
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              <span>{copied ? "Copied" : "Copy Site URL"}</span>
            </button>
            <a href="https://github.com/WafflesNZXT" className="social-link" target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" /> <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/wafisyed/" className="social-link" target="_blank" rel="noreferrer">
              <FaLinkedin aria-hidden="true" /> <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
      <button
        className={`scroll-to-top react-scroll-top ${showTop ? "visible" : ""}`}
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp aria-hidden="true" />
      </button>
    </>
  );
}
