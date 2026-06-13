import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HighlightsSection } from "./components/HighlightsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { SkillsSection } from "./components/SkillsSection";
import { usePortfolio } from "./hooks/usePortfolio";

function App() {
  const portfolio = usePortfolio();

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.035),_transparent_28%),radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_24%)]" />
      <div className="grid-overlay pointer-events-none fixed inset-0 opacity-25" />
      <main className="relative">
        <HeroSection profile={portfolio.profile} />
        <AboutSection profile={portfolio.profile} />
        <HighlightsSection achievements={portfolio.achievements || []} />
        <SkillsSection skills={portfolio.skills.categories} />
        <ExperienceSection experience={portfolio.experience} />
        <ServicesSection />
        <ProjectsSection projects={portfolio.projects} />
        <Footer profile={portfolio.profile} />
      </main>
    </div>
  );
}

export default App;
