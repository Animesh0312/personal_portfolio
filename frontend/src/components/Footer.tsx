import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { Profile } from "../types/portfolio";
import { SocialLinks } from "./SocialLinks";

interface FooterProps {
  profile: Profile;
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer({ profile }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const email = profile.social.email ?? "";

  const handleCopy = async () => {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer id="contact" className="scroll-mt-20 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-glow sm:p-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="hero-heading text-3xl font-semibold tracking-[-0.05em]">{profile.name}</p>
            <p className="text-base leading-7 text-white/66">{profile.specialization}</p>
            <p className="text-sm uppercase tracking-[0.24em] text-white/42">{profile.location}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/42">Navigate</p>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/42">Reach Out</p>
            <div className="mt-4 space-y-4">
              {email ? (
                <div className="flex flex-wrap items-center gap-3">
                  <a href={`mailto:${email}`} className="text-sm text-white/78 transition hover:text-white">
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/68 transition hover:text-white"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              ) : null}
              {profile.social.phone ? <p className="text-sm text-white/60">{profile.social.phone}</p> : null}
              <SocialLinks social={profile.social} variant="inline" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/42 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
