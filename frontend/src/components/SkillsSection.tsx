import { motion } from "framer-motion";
import { Braces, Database, Layers3, Sparkles } from "lucide-react";
import type { SkillCategory } from "../types/portfolio";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const icons = [Braces, Layers3, Sparkles, Database];

export function SkillsSection({ skills }: SkillsSectionProps) {
  const marqueeItems = [...skills.flatMap((category) => category.items), ...skills.flatMap((category) => category.items)];

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-white/42">Skills</p>
            <h2 className="hero-heading mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              A modern engineering stack with depth across delivery layers.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/58">
            Product engineering, backend systems, AI workflows, and cloud foundations working as one design-aware toolset.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="skill-marquee flex w-max gap-3">
            {marqueeItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/64"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((category, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.article
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))] p-6 shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.24em] text-white/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/70 transition group-hover:border-white/20 group-hover:text-white">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-white">{category.name}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/58"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
