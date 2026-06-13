import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "../types/portfolio";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const topOffset = `${104 + index * 28}px`;
  const detailRows = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Stack", value: `${project.stack.length} tools` },
    { label: "Type", value: project.highlight ? "Featured" : "Selected" },
  ];

  return (
    <article
      className="sticky overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(25,25,25,0.98),rgba(14,14,14,0.98))] p-6 shadow-glow"
      style={{ top: topOffset }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-medium tracking-[-0.05em] text-white/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.highlight ? (
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/72">
                  Highlighted
                </span>
              ) : null}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/58">
              {project.year}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/40">{project.role}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{project.title}</h3>
            <p className="mt-2 text-base text-white/54">{project.subtitle}</p>
          </div>
          <p className="text-base leading-8 text-white/68">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/54"
              >
                {item}
              </span>
            ))}
          </div>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:scale-[1.01]"
            >
              Live Project
              <ArrowUpRight size={16} />
            </a>
          ) : null}
        </div>
        <div className="grid gap-4 rounded-[28px] border border-white/10 bg-black/30 p-5 sm:grid-cols-2">
          {detailRows.map((row) => (
            <div key={row.label} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/36">{row.label}</p>
              <p className="mt-3 text-base leading-7 text-white/76">{row.value}</p>
            </div>
          ))}
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/36">Core Stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={`${project.id}-${item}`}
                  className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/58"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
