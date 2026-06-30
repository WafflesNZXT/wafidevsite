import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main id="main-content"><section className="page-hero"><div className="container"><h1>Page Not Found</h1><p>The page you requested does not exist.</p><Link href="/home" className="btn btn-primary"><ArrowLeft aria-hidden="true" /> Back Home</Link></div></section></main>; }
