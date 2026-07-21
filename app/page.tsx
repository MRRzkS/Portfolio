import Link from "next/link";
import FluidHero from "@/components/FluidHero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function Home() {
  const projects = await getPublishedProjects();
  const featured = projects.slice(0, 4);

  return (
    <div>
      {/* 1. Hero (name / role) */}
      <FluidHero>
        <p className="eyebrow accent">Physics-Informed Machine Learning / Hidden Fluid Mechanics</p>
        <h1 className="mt-4 max-w-[16ch] text-5xl font-bold leading-[1.05] md:text-6xl">
          Neural networks that obey the laws of fluids.
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted)]">
          Rienchy Razak. Informatics Engineering undergraduate at Universitas
          Pancasila (GPA 3.87), reconstructing flow fields from sparse data with
          PINNs and shipping disciplined software in Java and TypeScript.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn primary" href="/projects">View projects</Link>
          <a className="btn ghost" href="https://github.com/MRRzkS" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </FluidHero>

      {/* 2. Project grid (selected work) */}
      <section className="pt-16" aria-labelledby="work-heading">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="work-heading" className="mt-2 text-2xl font-semibold tracking-tight">
                Built, documented, defensible.
              </h2>
            </div>
            <Link className="quiet-link hidden text-sm sm:block" href="/projects">All projects</Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm sm:hidden">
          <Link className="quiet-link" href="/projects">All projects</Link>
        </p>
      </section>

      {/* 3. About / philosophy */}
      <section className="pt-24" aria-labelledby="about-heading">
        <Reveal>
          <p className="eyebrow accent">Approach</p>
          <h2 id="about-heading" className="mt-2 max-w-[20ch] text-3xl font-semibold leading-tight tracking-tight">
            Two disciplines, one habit of rigor.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <div className="card h-full p-6">
              <h3 className="font-head text-lg font-semibold">Physics-grounded ML</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                I build models that respect the equations behind the data, from
                physics-informed neural networks to spline-based architectures,
                implemented and benchmarked in PyTorch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="card h-full p-6">
              <h3 className="font-head text-lg font-semibold">Software that ships</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                From a full-SDLC Java application to an offline-first PWA written
                in vanilla JavaScript, I care about working software, audit
                trails, and code someone else can read.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card h-full p-6">
              <h3 className="font-head text-lg font-semibold">Detail as a default</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Accelerated coursework at GPA 3.87, IEEE-format write-ups, and
                interfaces built for real devices. The small things are the
                work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Contact */}
      <section className="pt-24" aria-labelledby="contact-heading">
        <Reveal>
          <div className="card p-8 md:p-10">
            <p className="eyebrow accent">Contact</p>
            <h2 id="contact-heading" className="mt-2 max-w-[22ch] text-3xl font-semibold leading-tight tracking-tight">
              Open to an AI or Backend internship.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--muted)]">
              Currently seeking a placement where physics-informed modeling and
              careful engineering both matter. The fastest way to reach me is
              email.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn primary" href="mailto:rienchy.razak@gmail.com">Email me</a>
              <a className="btn ghost" href="https://www.linkedin.com/in/rienchy-razak" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn ghost" href="https://github.com/MRRzkS" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
