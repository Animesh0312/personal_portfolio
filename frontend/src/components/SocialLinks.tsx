import { Github, Globe, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import type { SocialLinksData } from "../types/portfolio";

interface SocialLinksProps {
  social: SocialLinksData;
  variant?: "pill" | "inline";
}

interface ResolvedSocialItem {
  key: keyof SocialLinksData;
  label: string;
  icon: typeof Github;
  value: string;
  resolvedHref: string;
}

const socialItems = [
  { key: "github", label: "GitHub", icon: Github, href: (value: string) => value },
  { key: "instagram", label: "Instagram", icon: Instagram, href: (value: string) => value },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, href: (value: string) => value },
  { key: "email", label: "Email", icon: Mail, href: (value: string) => `mailto:${value}` },
  { key: "phone", label: "Phone", icon: Phone, href: (value: string) => `tel:${value.replace(/\s+/g, "")}` },
  { key: "website", label: "Website", icon: Globe, href: (value: string) => value },
] as const;

export function SocialLinks({ social, variant = "pill" }: SocialLinksProps) {
  const links: ResolvedSocialItem[] = [];

  socialItems.forEach((item) => {
    const value = social[item.key];
    if (!value) return;

    links.push({
      key: item.key,
      label: item.label,
      icon: item.icon,
      value,
      resolvedHref: item.href(value),
    });
  });

  if (!links.length) {
    return null;
  }

  return (
    <div className={variant === "pill" ? "flex flex-wrap justify-center gap-3" : "flex flex-wrap gap-3"}>
      {links.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.key}
            href={item.resolvedHref}
            target={item.key === "email" || item.key === "phone" ? undefined : "_blank"}
            rel={item.key === "email" || item.key === "phone" ? undefined : "noreferrer"}
            className={
              variant === "pill"
                ? "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                : "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/70 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
            }
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}
