/**
 * Universal School Platform - Server Entry Point
 */

import { createApp } from "./app.js";

const PORT = process.env.PORT || process.env.BACKEND_PORT || 4000;

export function startServer() {
  const app = createApp();
  const server = app.listen(PORT, () => {
    console.log(`[API Server] Running on http://localhost:${PORT}`);
    console.log(`[API Server] Organization module mounted at http://localhost:${PORT}/api/v1/organization`);
  });

  return { app, server };
}

