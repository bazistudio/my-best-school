/**
 * Universal School Platform - Application Composition
 * Mounts middleware and modular domain routers under /api/v1
 */

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { InMemoryOrganizationRepository } from "./modules/organization/organization.repository.js";
import { OrganizationService } from "./modules/organization/organization.service.js";
import { OrganizationController } from "./modules/organization/organization.controller.js";
import { createOrganizationRouter } from "./modules/organization/organization.routes.js";

export function createApp(): Express {
  const app = express();

  // Core Middleware
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      platform: "Universal School Platform Core API",
      version: "v1",
    });
  });

  // Module 01: Organization Domain Composition
  const organizationRepository = new InMemoryOrganizationRepository();
  const organizationService = new OrganizationService(organizationRepository);
  const organizationController = new OrganizationController(organizationService);
  const organizationRouter = createOrganizationRouter(organizationController);

  // Mount API Gateway Routers
  app.use("/api/v1/organization", organizationRouter);

  // 404 Handler for undefined routes
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: "ROUTE_NOT_FOUND",
        message: "The requested API route does not exist.",
      },
    });
  });

  // Global Error Handler
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled API error:", err);
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred.",
      },
    });
  });

  return app;
}
