import { motion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 22,
    mass: 0.2,
  });

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="relative overflow-hidden rounded-full border border-white/10 bg-black/55 px-5 py-3 shadow-glow backdrop-blur-xl">
        <motion.div
          style={{ scaleX }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-accent-gradient"
        />
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 text-sm font-medium text-white/78">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs tracking-[0.3em]">
              AM
            </span>
            <span className="tracking-[0.34em]">PORTFOLIO</span>
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 p-2 text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            <Menu size={18} />
          </button>
          <div className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-xs tracking-[0.3em] text-white/62 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        {open ? (
          <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs tracking-[0.26em] text-white/72 transition hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
