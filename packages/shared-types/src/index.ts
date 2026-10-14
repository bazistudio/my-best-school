export interface SchoolBranding {
  name: string;
  shortName: string;
  tagline?: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
}

export interface BranchConfig {
  id: string;
  name: string;
  code: string;
  address?: string;
  isMain: boolean;
}

export interface AppConfig {
  school: SchoolBranding;
  branches: BranchConfig[];
  currency: string;
  locale: string;
  academicYear: string;
}
