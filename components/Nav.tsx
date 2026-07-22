"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
];

// Glassmorphism pill, fixed to the top so a recruiter can jump between
// sections without scrolling back up. Tracks the section in view.
export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.15, 0.4, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <div className="nav-wrap">
      <nav aria-label="Primary" className={`nav-pill backdrop-blur-xl backdrop-saturate-150 ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="font-head text-sm font-semibold tracking-tight text-[var(--text)]">
          Rienchy Razak
        </Link>

        <div className="ml-auto flex items-center gap-0.5">
          {onHome ? (
            SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="nav-link relative hidden sm:inline-flex"
                aria-current={active === s.id ? "true" : undefined}
              >
                {s.label}
              </a>
            ))
          ) : (
            <Link href="/" className="nav-link hidden sm:inline-flex">
              Home
            </Link>
          )}

          <Link href="/projects" className="nav-link">Projects</Link>
          <a
            className="nav-link"
            href="https://github.com/MRRzkS"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn primary !min-h-[38px] !px-3.5 !py-1.5 !text-[0.82rem]"
            href="mailto:rienchy.razak@gmail.com"
          >
            Email
          </a>
        </div>
      </nav>
    </div>
  );
}
