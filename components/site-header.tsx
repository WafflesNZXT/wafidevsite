"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/hire", label: "Hire Me" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("wafi_theme") as Theme | null;
    const preferred: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = saved ?? preferred;
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("wafi_theme", next);
    setTheme(next);
    setToast(`${next === "dark" ? "Dark" : "Light"} theme enabled`);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="navbar" aria-label="Primary navigation">
        <div className="nav-container">
          <Link href="/home" className="nav-logo" aria-label="Wafi Syed home">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">Wafi Syed</span>
            <span className="logo-bracket">/&gt;</span>
          </Link>

          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {navItems.map((item) => {
              const active = item.href === "/projects"
                ? pathname.startsWith("/project")
                : item.href === "/case-studies"
                  ? pathname.startsWith("/case-studies")
                  : pathname === item.href || (item.href === "/home" && pathname === "/");
              return (
                <li className="nav-item" key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${item.label === "Hire Me" ? "nav-link-btn" : ""} ${active ? "active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "dark"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
            <button
              className="hamburger hamburger-button"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
      {toast ? (
        <div className="toast-container react-toast-container" aria-live="polite">
          <div className="toast toast-success" role="status">
            <span className="toast-icon" aria-hidden="true"><CheckCircle2 /></span>
            <span className="toast-message">{toast}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
