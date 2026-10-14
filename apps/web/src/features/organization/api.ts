/**
 * Organization API Client
 * Connects frontend features to the backend REST endpoints under /api/v1/organization
 */

import {
  ApiResponse,
  OrganizationProfile,
  Branch,
  AcademicYear,
  CreateBranchDto,
  UpdateOrganizationProfileDto,
} from "@universal-school/shared-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const json: ApiResponse<T> = await res.json();

    if (!res.ok || !json.success) {
      const message = json.error?.message || `Request failed with status ${res.status}`;
      const err = new Error(message) as Error & { code?: string; details?: unknown };
      err.code = json.error?.code || "API_ERROR";
      err.details = json.error?.details;
      throw err;
    }

    return json.data as T;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Network error connecting to organization backend service.");
  }
}

export const organizationApi = {
  getProfile: () => request<OrganizationProfile>("/organization/profile"),
  updateProfile: (data: UpdateOrganizationProfileDto) =>
    request<OrganizationProfile>("/organization/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getBranches: (params?: { isActive?: boolean; isMain?: boolean; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.isActive !== undefined) q.append("isActive", String(params.isActive));
    if (params?.isMain !== undefined) q.append("isMain", String(params.isMain));
    if (params?.search) q.append("search", params.search);
    const queryStr = q.toString() ? `?${q.toString()}` : "";
    return request<Branch[]>(`/organization/branches${queryStr}`);
  },

  createBranch: (data: CreateBranchDto) =>
    request<Branch>("/organization/branches", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getActiveAcademicYear: () =>
    request<AcademicYear>("/organization/academic-years/active"),

  getAcademicYears: () =>
    request<AcademicYear[]>("/organization/academic-years"),
};
