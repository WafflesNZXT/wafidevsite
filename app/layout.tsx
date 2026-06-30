import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wafisyed.dev"),
  title: { default: "Portfolio - Web Development Projects", template: "%s | Wafi Syed" },
  description: "Wafi Syed - front-end and UX developer crafting fast, accessible, and elegant web experiences.",
  alternates: { canonical: "/home" },
  openGraph: {
    title: "Wafi Syed - Web Developer",
    description: "Crafting polished, responsive websites that engage and convert.",
    url: "https://wafisyed.dev/",
    siteName: "Wafi Syed Portfolio",
    images: ["/images/inobex.jpeg"],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Wafi Syed - Web Developer", description: "Crafting polished, responsive websites that engage and convert.", images: ["/images/inobex.jpeg"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap" />
        <link rel="stylesheet" href="/styles.css?v=20260630-estimator-actions" />
      </head>
      <body className="tsx-site">
        <div className="abstract-bg" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
