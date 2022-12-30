export interface Resume {
  id: string;
  resumeName: string
  createInfo: CreateInfo;
  mainInfo: MainInfo;
  profileInfo?: ProfileInfo;
  educationInfo?: EducationInfo;
  Skills?: Skills;
  Languages?: Languages;
  Projects?: Projects;
}

export interface CreateInfo {
  date: string;
  isUpdated: boolean;
}

export interface MainInfo {
  sectionName: string;
  name: string;
  phone: string;
  city: string;
  jobTitle: string;
  email: string;
  links: Link[];
}

export interface Link {
  name: string;
  url: string;
}

export interface ProfileInfo {
  sectionName: string;
  profileDescription: string;
}

export interface EducationInfo {
  sectionName: string;
  educations: Education[];
}

export interface Education {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  schoolCity: string;
  schoolCountry: string;
}

export interface Skills {
  sectionName: string;
  skills: Skill[];
}

export interface Skill {
  skillName: string;
  skillLevel: string;
}

export interface Languages {
  sectionName: string;
  languages: Language[];
}

export interface Language {
  languageName: string;
  languageLevel: string;
}

export interface Projects {
  sectionName: string;
  projects: Project[];
}

export interface Project {
  projectName: string;
  projectDescription: string;
  projectLink: string;
}