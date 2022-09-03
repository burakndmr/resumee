export interface Resume {
  resumeInfo: ResumeInfo;
  mainInfo: MainInfo;
  profileInfo: ProfileInfo;
  educationInfo: EducationInfo;
  Skills: Skills;
}

export interface Config {
  selectedResume: string;
}

export interface ResumeInfo {
  resumeName: string;
  id: string;
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
