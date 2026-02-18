import { createClient } from "redis";
import { Request, Response, NextFunction } from "express";

const redisClient = createClient({ url: "redis://cache" });
redisClient.connect().catch(console.error);

const CACHE_TTL = 60 * 60; // 1 hour

const redisCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = `cache:${req.originalUrl}`;
  console.log(`[redisCache] Checking cache for key: ${key}`);
  redisClient
    .get(key)
    .then((cached) => {
      if (cached) {
        console.log(`[redisCache] HIT for ${key}`);
        try {
          const parsed = JSON.parse(cached);
          console.log(`[redisCache] Parsed cached value:`, parsed);
          res.setHeader("X-Cache", "HIT");
          res.setHeader("Cache-Control", "no-store");
          res.type("application/json");
          res.json(parsed);
        } catch (e) {
          console.error(
            `[redisCache] Error parsing cached value for ${key}:`,
            e,
            cached,
          );
          res.setHeader("X-Cache", "ERROR");
          res
            .status(500)
            .json({ error: "Cache parse error", details: String(e) });
        }
        return;
      }
      console.log(`[redisCache] MISS for ${key}`);
      const originalJson = res.json.bind(res);
      res.json = (body: any) => {
        console.log(`[redisCache] Caching response for ${key}:`, body);
        redisClient
          .setEx(key, CACHE_TTL, JSON.stringify(body))
          .then(() => {
            console.log(`[redisCache] Successfully cached for ${key}`);
          })
          .catch((err) => {
            console.error(`[redisCache] Error setting cache for ${key}:`, err);
          });
        res.setHeader("X-Cache", "MISS");
        res.setHeader("Cache-Control", "no-store");
        res.type("application/json");
        return originalJson(body);
      };
      next();
    })
    .catch((err) => {
      console.error(`[redisCache] Redis error for key ${key}:`, err);
      next();
    });
};

export default redisCacheMiddleware;
