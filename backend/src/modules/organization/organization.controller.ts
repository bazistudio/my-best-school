/**
 * Organization Controller
 * Translates HTTP requests, calls domain service, and formats standard envelopes:
 * { success: true, data: ... } or { success: false, error: ... }
 */

import { Request, Response } from "express";
import { OrganizationService } from "./organization.service.js";

export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  private handleError(res: Response, err: unknown) {
    const errorObj = err as {
      status?: number;
      code?: string;
      message?: string;
      details?: unknown;
    };

    const status = errorObj.status || 500;
    res.status(status).json({
      success: false,
      error: {
        code: errorObj.code || "INTERNAL_SERVER_ERROR",
        message: errorObj.message || "An unexpected error occurred.",
        details: errorObj.details,
      },
    });
  }

  getProfile = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.getProfile();
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const data = await this.service.updateProfile(req.body);
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  getBranches = async (req: Request, res: Response) => {
    try {
      const filter: { isActive?: boolean; isMain?: boolean; search?: string } = {};
      if (req.query.isActive !== undefined) {
        filter.isActive = req.query.isActive === "true";
      }
      if (req.query.isMain !== undefined) {
        filter.isMain = req.query.isMain === "true";
      }
      if (typeof req.query.search === "string") {
        filter.search = req.query.search;
      }

      const data = await this.service.getBranches(filter);
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  getBranchById = async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const data = await this.service.getBranchById(id);
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  createBranch = async (req: Request, res: Response) => {
    try {
      const data = await this.service.createBranch(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  updateBranch = async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const data = await this.service.updateBranch(id, req.body);
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  getAcademicYears = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.getAcademicYears();
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  getActiveAcademicYear = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.getActiveAcademicYear();
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  createAcademicYear = async (req: Request, res: Response) => {
    try {
      const data = await this.service.createAcademicYear(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  setActiveAcademicYear = async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const data = await this.service.setActiveAcademicYear(id);
      res.json({ success: true, data });
    } catch (err) {
      this.handleError(res, err);
    }
  };
}
