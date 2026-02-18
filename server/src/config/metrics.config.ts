import client from "prom-client";
import type { Request, Response, NextFunction } from "express";

// Collecter les métriques Node.js par défaut (CPU, mémoire, heap, event loop)
client.collectDefaultMetrics({
  prefix: "express_app_",
});

// Histogramme pour les durées de requêtes HTTP
export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

// Compteur de requêtes HTTP
export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// Endpoints à exclure des métriques (monitoring interne)
const EXCLUDED_PATHS = ["/metrics", "/health"];

// Middleware pour mesurer les requêtes
export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (EXCLUDED_PATHS.includes(req.path)) {
    return next();
  }

  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;

    httpRequestDuration.observe(
      { method: req.method, route, status_code: res.statusCode },
      duration
    );
    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });
  });

  next();
};

// Handler pour l'endpoint /metrics
export const metricsHandler = async (_req: Request, res: Response) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
};

export const register = client.register;
