/**
 * Organization Routes
 * Defines REST endpoints for Organization, Branches, and Academic Years.
 * Mounted at: /api/v1/organization
 */

import { Router } from "express";
import { OrganizationController } from "./organization.controller.js";

export function createOrganizationRouter(controller: OrganizationController): Router {
  const router = Router();

  // Institution Profile
  router.get("/profile", controller.getProfile);
  router.put("/profile", controller.updateProfile);

  // Branches
  // Static routes precede parameterized routes
  router.get("/branches", controller.getBranches);
  router.post("/branches", controller.createBranch);
  router.get("/branches/:id", controller.getBranchById);
  router.put("/branches/:id", controller.updateBranch);

  // Academic Years & Terms
  // Static routes precede parameterized routes
  router.get("/academic-years", controller.getAcademicYears);
  router.get("/academic-years/active", controller.getActiveAcademicYear);
  router.post("/academic-years", controller.createAcademicYear);
  router.post("/academic-years/:id/activate", controller.setActiveAcademicYear);

  return router;
}
