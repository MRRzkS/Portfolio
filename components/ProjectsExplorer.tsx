"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { categories, type Category, type Project } from "@/lib/seed";

// Category filter (Portfolio Grid pattern: "Filter by category").
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category>("All");
  const shown = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="filter-btn"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 60}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
