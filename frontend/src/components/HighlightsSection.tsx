import { motion } from "framer-motion";

interface HighlightsSectionProps {
  achievements: string[];
}

export function HighlightsSection({ achievements }: HighlightsSectionProps) {
  if (!achievements.length) {
    return null;
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-glow">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-white/42">Highlights</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Signal over filler.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/56">
            Quick proof points laid out in a denser, more editorial grid inspired by the `ui-ux-pro-max` skill guidance.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-[26px] border border-white/10 bg-black/25 p-5"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/34">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-base leading-7 text-white/72">{achievement}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
