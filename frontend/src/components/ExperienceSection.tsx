import { motion } from "framer-motion";
import type { ExperienceItem } from "../types/portfolio";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-white/42">Experience</p>
            <h2 className="hero-heading mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Systems, teams, and product outcomes that compound.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/58">
            A mix of platform thinking, product execution, and hands-on delivery across multiple stages of engineering growth.
          </p>
        </div>

        <div className="space-y-5">
          {experience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="grid gap-8 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-8 shadow-glow lg:grid-cols-[90px_1fr]"
            >
              <div className="text-2xl font-medium tracking-[-0.05em] text-white/35">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {item.company} · {item.role}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-white/64">{item.summary}</p>
                </div>
                <div className="space-y-4">
                  <div className="inline-flex rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-sm text-white/68">
                    {item.period}
                  </div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/42">{item.location}</p>
                  <ul className="space-y-3 text-sm leading-7 text-white/62">
                    {item.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
