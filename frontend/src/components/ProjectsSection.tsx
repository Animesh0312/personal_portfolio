import { motion } from "framer-motion";
import type { ProjectItem } from "../types/portfolio";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-white/42">Projects</p>
            <h2 className="hero-heading mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Selected work across product, platform, and AI systems.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/58">
            Highlighted projects are pinned first, with cards that stay present while you move through the work.
          </p>
        </div>
        <div className="mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="skill-marquee flex w-max gap-3 [animation-duration:30s]">
            {[...projects, ...projects].map((project, index) => (
              <span
                key={`${project.id}-${index}`}
                className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/64"
              >
                {project.title}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
