import fs from "node:fs";
import path from "node:path";
import { LegacyScript } from "@/components/legacy-script";

const legacyPagesDir = path.join(process.cwd(), "legacy-static", "pages");

function rewriteLegacyUrl(url: string) {
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(url)) return url;

  const normalized = url.replace(/^\.\//, "");
  const match = normalized.match(/^([^?#]*)([?#].*)?$/);
  const pathname = (match?.[1] ?? normalized).replace(/^\//, "");
  const suffix = match?.[2] ?? "";

  const routes: Record<string, string> = {
    "": "/home",
    "index.html": "/home",
    "projects.html": "/projects",
    "project.html": "/project",
    "about.html": "/about",
    "hire.html": "/hire",
    "404.html": "/404",
  };

  if (routes[pathname]) return `${routes[pathname]}${suffix}`;
  if (pathname.startsWith("images/")) return `/${pathname}${suffix}`;
  if (pathname === "styles.css" || pathname === "script.js" || pathname === "redirect-404.js") {
    return `/${pathname}${suffix}`;
  }

  return url;
}

function rewriteLegacyMarkup(markup: string) {
  return markup
    .replace(/<script\s+src=["']script\.js["']><\/script>/gi, "")
    .replace(/<script\s+src=["']\.\/script\.js["']><\/script>/gi, "")
    .replace(/\b(href|src)=(['"])([^'"]+)\2/g, (_match, attr: string, quote: string, url: string) => {
      return `${attr}=${quote}${rewriteLegacyUrl(url)}${quote}`;
    });
}

function readLegacyBody(fileName: string) {
  const filePath = path.join(legacyPagesDir, fileName);
  const html = fs.readFileSync(filePath, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) return rewriteLegacyMarkup(html);
  return rewriteLegacyMarkup(bodyMatch[1]);
}

export function LegacyPage({ fileName }: { fileName: string }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: readLegacyBody(fileName) }} />
      <LegacyScript />
    </>
  );
}
