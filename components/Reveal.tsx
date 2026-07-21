"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-triggered entrance (Motion-Driven pattern). Respects reduced-motion
// via CSS; if JS is off, content stays visible (.reveal has a no-JS fallback
// only when .in is present, so we also set visible on mount for safety).
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    // Safety net: never let content stay hidden if the observer misses.
    const t = setTimeout(() => setShown(true), 700);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
