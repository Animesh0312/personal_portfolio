export interface SocialLinksData {
  github?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  specialization: string;
  location: string;
  yearsOfExperience: number;
  bio: string;
  avatarSvg: string;
  avatarImage?: string;
  social: SocialLinksData;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  link: string;
  image: string;
  highlight: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  summary: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: {
    categories: SkillCategory[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
  achievements?: string[];
}
