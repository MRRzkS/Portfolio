import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rienchy Razak | Informatics Engineering",
  description:
    "Physics-informed machine learning and disciplined software engineering. Portfolio of Muhammad Rienchy Razak Simatupang, Informatics Engineering undergraduate.",
  openGraph: {
    title: "Rienchy Razak | Informatics Engineering",
    description:
      "Physics-informed machine learning and disciplined software engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--accent-strong)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-8">
          <Link href="/" className="font-head text-base font-semibold tracking-tight">
            Rienchy Razak
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-[var(--muted)]">
            <Link className="quiet-link" href="/projects">Projects</Link>
            <a className="quiet-link" href="https://github.com/MRRzkS" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="quiet-link" href="https://www.linkedin.com/in/rienchy-razak" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </header>
        <main id="main" className="mx-auto max-w-5xl px-6">{children}</main>
        <footer className="mx-auto mt-24 max-w-5xl px-6 pb-12">
          <div className="rule flex flex-wrap items-center justify-between gap-3 pt-6 text-sm text-[var(--muted)]">
            <p>Muhammad Rienchy Razak Simatupang, Depok, Indonesia</p>
            <a className="quiet-link" href="mailto:rienchy.razak@gmail.com">rienchy.razak@gmail.com</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
