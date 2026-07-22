import GridBackdrop from "@/components/GridBackdrop";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import Reveal from "@/components/Reveal";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;
export const metadata = { title: "Projects | Rienchy Razak" };

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return (
    <div className="relative min-h-screen">
      <GridBackdrop />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-32">
        <Reveal>
          <p className="eyebrow accent">Projects</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Everything, filtered.</h1>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            Machine learning work and working software. Screenshots and
            repositories where available.
          </p>
        </Reveal>
        <div className="mt-10">
          <ProjectsExplorer projects={projects} />
        </div>
        <footer className="mt-20">
          <div className="rule flex flex-wrap items-center justify-between gap-3 pt-6 text-sm text-[var(--muted)]">
            <p>Muhammad Rienchy Razak Simatupang, Depok, Indonesia</p>
            <a className="quiet-link" href="mailto:rienchy.razak@gmail.com">
              rienchy.razak@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
