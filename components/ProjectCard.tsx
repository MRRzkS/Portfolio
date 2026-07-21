import Image from "next/image";
import type { Project } from "@/lib/seed";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group flex flex-col">
      <div className="relative aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--surface-2)]">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={`${project.title} interface screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="eyebrow">Documentation project</span>
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-[var(--border)] bg-[var(--bg)]/70 px-2.5 py-1 text-[0.68rem] text-[var(--muted)] backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-head text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-1 text-sm text-[var(--accent)]">{project.tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        {(project.repo_url || project.demo_url) && (
          <div className="mt-4 flex gap-5 text-sm">
            {project.repo_url && (
              <a
                className="quiet-link"
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repository
              </a>
            )}
            {project.demo_url && (
              <a
                className="quiet-link"
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
