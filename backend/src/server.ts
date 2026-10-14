/**
 * Server startup and lifecycle management boundary.
 * Reserved until dedicated server runtime phase is authorized.
 */
import { createApp } from "./app.js";

export function startServer() {
  const app = createApp();
  // Server startup hook reserved for future implementation
  return app;
}
