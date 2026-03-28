/**
 * Profile form types — extracted from EducationScreen and ExperienceScreen
 */

export interface IEducationFormState {
  country: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
}

export interface IExperienceFormState {
  jobTitle: string;
  company: string;
  country: string;
  city: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
}
