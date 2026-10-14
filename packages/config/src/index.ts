import { AppConfig } from "@universal-school/shared-types";

/**
 * Universal School Platform - Default Baseline Configuration
 * 
 * Reusable source code · Shared architecture · Neutral baseline branding.
 * Specific school identity (e.g. "My Best School") is loaded via environment
 * or client configuration overlays without modifying core business logic.
 */
export const defaultSchoolConfig: AppConfig = {
  school: {
    name: process.env.NEXT_PUBLIC_SCHOOL_NAME || "Universal School",
    shortName: process.env.NEXT_PUBLIC_SCHOOL_SHORT_NAME || "USP",
    tagline: process.env.NEXT_PUBLIC_SCHOOL_TAGLINE || "Excellence in Education",
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#1e40af",
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#0d9488",
  },
  branches: [
    {
      id: "branch-01",
      name: "Main Campus",
      code: "MAIN",
      address: "Campus Street, Sector A",
      isMain: true,
    },
    {
      id: "branch-02",
      name: "City Branch",
      code: "CITY",
      address: "Downtown Avenue, Block B",
      isMain: false,
    },
  ],
  currency: process.env.NEXT_PUBLIC_CURRENCY || "PKR",
  locale: process.env.NEXT_PUBLIC_LOCALE || "en-PK",
  academicYear: process.env.NEXT_PUBLIC_ACADEMIC_YEAR || "2026-2027",
};

/**
 * Example Client Configuration (My Best School)
 * Used to demonstrate client overlay configuration without hardcoding.
 */
export const myBestSchoolConfig: AppConfig = {
  school: {
    name: "My Best School",
    shortName: "MBS",
    tagline: "Empowering Next Generation Leaders",
    primaryColor: "#2563eb",
    accentColor: "#f59e0b",
  },
  branches: [
    {
      id: "mbs-01",
      name: "Main Branch",
      code: "MBS-M",
      address: "Main Boulevard",
      isMain: true,
    },
    {
      id: "mbs-02",
      name: "Secondary Branch",
      code: "MBS-S",
      address: "Secondary Campus",
      isMain: false,
    },
  ],
  currency: "PKR",
  locale: "en-PK",
  academicYear: "2026-2027",
};

export function getActiveSchoolConfig(): AppConfig {
  const clientPreset = process.env.NEXT_PUBLIC_CLIENT_PRESET;
  if (clientPreset === "my-best-school") {
    return myBestSchoolConfig;
  }
  return defaultSchoolConfig;
}
