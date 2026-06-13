import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Boxes, MapPin, Orbit, Sparkles } from "lucide-react";
import type { Profile } from "../types/portfolio";
import { Navbar } from "./Navbar";
import { SocialLinks } from "./SocialLinks";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const spotlightItems = [
    `${profile.yearsOfExperience}+ years building`,
    profile.specialization,
    "Interactive systems with strong delivery",
  ];
  const orbitCards = [
    { icon: Boxes, label: "Backend Systems", position: "-left-5 top-12", delay: 0.1 },
    { icon: Orbit, label: "ML + NLP", position: "-right-4 top-10", delay: 0.18 },
    { icon: Sparkles, label: "Interactive UI", position: "left-6 -bottom-1", delay: 0.26 },
  ];

  return (
    <section id="home" className="min-h-screen scroll-mt-20">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/60">
              <Sparkles size={14} className="text-white/72" />
              {profile.role}
            </div>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.28em] text-white/40">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-white/60" />
                  {profile.location}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
                <span>Available for impact-driven work</span>
              </div>
              <h1 className="hero-heading max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-6xl lg:text-8xl xl:text-[7.25rem]">
                Hi, I&apos;m {profile.shortName}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">{profile.tagline}</p>
            </div>
            <div className="grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-5 shadow-glow sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex flex-wrap gap-3">
                {spotlightItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/68"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <a
                  href="#projects"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:scale-[1.01]"
                >
                  See Projects
                  <ArrowDownRight size={18} />
                </a>
                {profile.social.website ? (
                  <a
                    href={profile.social.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-[0.22em] text-white/50 transition hover:text-white"
                  >
                    Personal Site
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </div>
            <SocialLinks social={profile.social} variant="pill" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
            className="mx-auto flex w-full max-w-xl justify-center"
          >
            <div className="hero-stage relative w-full overflow-visible rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-5 shadow-glow">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 rounded-full border border-white/8 bg-white/[0.02]" />
              <div className="pointer-events-none absolute bottom-8 right-8 h-16 w-16 rounded-2xl border border-white/10 bg-white/[0.03]" />
              {orbitCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: card.delay }}
                    className={`floating-card absolute z-20 hidden rounded-full border border-white/10 bg-black/55 px-4 py-3 text-xs uppercase tracking-[0.22em] text-white/74 shadow-glow backdrop-blur-xl lg:inline-flex ${card.position}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon size={14} className="text-white/62" />
                      {card.label}
                    </span>
                  </motion.div>
                );
              })}
              <div className="grid gap-5 lg:grid-cols-[0.95fr_0.85fr]">
                <motion.div
                  whileHover={{ rotateX: -6, rotateY: 8, y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="portrait-tilt relative aspect-square w-full rounded-[32px] border border-white/10 bg-black/30 p-3"
                >
                  <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_35%,rgba(255,255,255,0.03))]" />
                  {profile.avatarImage ? (
                    <img
                      src={profile.avatarImage}
                      alt={`${profile.name} cartoon portrait`}
                      className="relative h-full w-full rounded-[26px] object-cover"
                    />
                  ) : (
                    <div
                      className="relative h-full w-full rounded-[26px] [&_svg]:h-full [&_svg]:w-full"
                      dangerouslySetInnerHTML={{ __html: profile.avatarSvg }}
                    />
                  )}
                </motion.div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/38">Experience</p>
                    <p className="mt-3 text-4xl font-semibold text-white">{profile.yearsOfExperience}+</p>
                    <p className="mt-3 text-sm leading-6 text-white/60">
                      Shipping interfaces, APIs, and intelligent workflows.
                    </p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/38">Focus</p>
                    <p className="mt-3 text-base leading-7 text-white/72">{profile.specialization}</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/38">Approach</p>
                    <p className="mt-3 text-base leading-7 text-white/72">
                      Clear architecture, expressive UI, and systems that feel fast and trustworthy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
