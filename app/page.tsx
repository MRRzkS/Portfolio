import Link from "next/link";
import FluidHero from "@/components/FluidHero";
import GridBackdrop from "@/components/GridBackdrop";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function Home() {
  const projects = await getPublishedProjects();
  const featured = projects.slice(0, 4);

  return (
    <div>
      {/* Hero: pinned, then covered by the section below on scroll. */}
      <FluidHero>
        <p className="eyebrow accent">
          Informatics Engineering / Universitas Pancasila
        </p>
        <h1 className="mt-4 max-w-[17ch] text-5xl font-bold leading-[1.05] md:text-6xl">
          I build machine learning models and software that ships.
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted)]">
          Rienchy Razak. Undergraduate at GPA 3.87, with hands-on deep learning
          implementation in PyTorch and full-lifecycle software engineering in
          Java and TypeScript. Currently seeking an AI or Backend internship.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn primary" href="/projects">View projects</Link>
          <a className="btn ghost" href="#contact">Get in touch</a>
        </div>
      </FluidHero>

      {/* Everything below rides over the hero. */}
      <div className="cover">
        <GridBackdrop />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-4 pt-20">
          {/* Selected work */}
          <section id="work" aria-labelledby="work-heading">
            <Reveal>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="eyebrow">Selected work</p>
                  <h2 id="work-heading" className="mt-2 text-2xl font-semibold tracking-tight">
                    Built, documented, defensible.
                  </h2>
                </div>
                <Link className="quiet-link hidden text-sm sm:block" href="/projects">
                  All projects
                </Link>
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

          {/* Approach */}
          <section id="approach" className="pt-24" aria-labelledby="approach-heading">
            <Reveal>
              <p className="eyebrow accent">Approach</p>
              <h2
                id="approach-heading"
                className="mt-2 max-w-[20ch] text-3xl font-semibold leading-tight tracking-tight"
              >
                Two disciplines, one habit of rigor.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Reveal delay={0}>
                <div className="card h-full p-6">
                  <h3 className="font-head text-lg font-semibold">Machine learning, end to end</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    From classical classifiers to modern neural architectures,
                    I implement, train, and benchmark models in PyTorch and
                    scikit-learn, and I read the papers behind them.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="card h-full p-6">
                  <h3 className="font-head text-lg font-semibold">Software that ships</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    From a full-lifecycle Java application to an offline-first
                    PWA written in vanilla JavaScript, I care about working
                    software, audit trails, and code someone else can read.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="card h-full p-6">
                  <h3 className="font-head text-lg font-semibold">Detail as a default</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    Accelerated coursework at GPA 3.87, IEEE-format write-ups,
                    and interfaces built for real devices. The small things are
                    the work.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pt-24" aria-labelledby="contact-heading">
            <Reveal>
              <div className="card p-8 md:p-10">
                <p className="eyebrow accent">Contact</p>
                <h2
                  id="contact-heading"
                  className="mt-2 max-w-[22ch] text-3xl font-semibold leading-tight tracking-tight"
                >
                  Open to an AI or Backend internship.
                </h2>
                <p className="mt-4 max-w-xl text-[var(--muted)]">
                  I am looking for a team where I can learn quickly and
                  contribute to real systems, whether the work is modeling,
                  data, or backend engineering. The fastest way to reach me is
                  email.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn primary" href="mailto:rienchy.razak@gmail.com">Email me</a>
                  <a
                    className="btn ghost"
                    href="https://www.linkedin.com/in/rienchy-razak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="btn ghost"
                    href="https://github.com/MRRzkS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <footer className="mt-24 pb-12">
            <div className="rule flex flex-wrap items-center justify-between gap-3 pt-6 text-sm text-[var(--muted)]">
              <p>Muhammad Rienchy Razak Simatupang, Depok, Indonesia</p>
              <a className="quiet-link" href="mailto:rienchy.razak@gmail.com">
                rienchy.razak@gmail.com
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}