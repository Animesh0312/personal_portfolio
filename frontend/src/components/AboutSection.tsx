import { motion } from "framer-motion";
import type { Profile } from "../types/portfolio";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const highlights = [
    { label: "Role", value: profile.role },
    { label: "Base", value: profile.location },
    { label: "Years", value: `${profile.yearsOfExperience}+` },
  ];

  return (
    <section id="about" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.32em] text-white/42">About</p>
          <h2 className="hero-heading mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Building thoughtful software with strong technical depth.
          </h2>
          <div className="mt-8 grid gap-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/38">{item.label}</p>
                <p className="mt-2 text-base leading-7 text-white/72">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-lg leading-9 text-white/72 [overflow-wrap:normal] [word-break:normal]">
            {profile.bio}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">Specialization</p>
              <p className="mt-3 text-base leading-7 text-white/72">{profile.specialization}</p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(217,70,239,0.12),rgba(249,115,22,0.08))] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">Working Style</p>
              <p className="mt-3 text-base leading-7 text-white/72">
                Systems-first execution paired with clear product communication and polished interaction details.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
