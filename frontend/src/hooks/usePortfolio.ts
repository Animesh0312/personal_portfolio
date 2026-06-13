import portfolioData from "../data/portfolio.json";
import type { PortfolioData } from "../types/portfolio";

const typedPortfolio = portfolioData as PortfolioData;
const fallbackAvatarSvg =
  '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#D946EF"/><stop offset="55%" stop-color="#8B5CF6"/><stop offset="100%" stop-color="#F97316"/></linearGradient><linearGradient id="fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#171717"/><stop offset="100%" stop-color="#0C0C0C"/></linearGradient></defs><rect width="320" height="320" rx="52" fill="url(#fill)"/><rect x="18" y="18" width="284" height="284" rx="40" fill="none" stroke="url(#ring)" stroke-width="4" opacity="0.8"/><circle cx="160" cy="118" r="48" fill="#1F1F1F" stroke="#4B5563" stroke-width="3"/><path d="M92 244c12-38 44-62 68-62s56 24 68 62" fill="#1A1A1A" stroke="#5B6470" stroke-width="3" stroke-linecap="round"/><circle cx="143" cy="112" r="6" fill="#BFC9D4"/><circle cx="177" cy="112" r="6" fill="#BFC9D4"/><path d="M141 138c10 9 28 9 38 0" fill="none" stroke="#9099A5" stroke-width="3" stroke-linecap="round"/></svg>';

export function usePortfolio(): PortfolioData {
  return {
    ...typedPortfolio,
    profile: {
      ...typedPortfolio.profile,
      avatarSvg: typedPortfolio.profile?.avatarSvg || fallbackAvatarSvg,
      avatarImage: typedPortfolio.profile?.avatarImage || "",
      social: {
        github: typedPortfolio.profile?.social?.github || "",
        instagram: typedPortfolio.profile?.social?.instagram || "",
        linkedin: typedPortfolio.profile?.social?.linkedin || "",
        email: typedPortfolio.profile?.social?.email || "",
        phone: typedPortfolio.profile?.social?.phone || "",
        website: typedPortfolio.profile?.social?.website || "",
      },
    },
    projects: [...(typedPortfolio.projects || [])]
      .map((project) => ({
        ...project,
        link: project.link || "",
        image: project.image || "",
      }))
      .sort((a, b) => Number(b.highlight) - Number(a.highlight)),
    testimonials: typedPortfolio.testimonials || [],
    achievements: typedPortfolio.achievements || [],
  };
}
