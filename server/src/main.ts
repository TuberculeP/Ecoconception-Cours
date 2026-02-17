import "dotenv/config";
import pg from "./config/db.config";
import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import router from "./routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config";
import { Article } from "./config/entities/Article";

import customSession from "./config/cache.config";

const main = async () => {
  const dev = process.env.NODE_ENV !== "production";

  initializePassport();

  const app = express();
  app.use(express.json());
  app.use(customSession());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/health", (_, res) => res.sendStatus(200));

  app.use("/api", router);

  const getBaseUrl = (req: express.Request) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.headers["x-forwarded-host"] || req.get("host");
    return `${protocol}://${host}`;
  };

  app.get("/robots.txt", (req, res) => {
    const baseUrl = getBaseUrl(req);
    res.type("text/plain").send(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`);
  });

  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = getBaseUrl(req);
    const articles = await pg.getRepository(Article).find({
      where: { status: "published" },
      select: ["slug", "updatedAt"],
      order: { updatedAt: "DESC" },
    });

    const staticRoutes = [
      { url: "/", priority: "1.0" },
      { url: "/feed", priority: "0.9" },
      { url: "/login", priority: "0.5" },
      { url: "/register", priority: "0.5" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
${articles
  .map(
    (article) => `  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${article.updatedAt.toISOString().split("T")[0]}</lastmod>
    <priority>0.8</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    res.type("application/xml").send(xml);
  });

  const vite = await createViteServer();

  app.use("/public", express.static("public"));

  if (dev) {
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(path.resolve(__dirname, "./client"), {
        maxAge: "1y",
      }),
    );
  }

  app.use(async (req, res, next) => {
    if (dev) {
      vite.middlewares(req, res, next);
    } else {
      res.sendFile(path.resolve(__dirname, "./client/index.html"));
    }
  });

  app.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
};

// start typeorm migration and server
(async () => {
  await pg.initialize();
  await pg.runMigrations();
  await main();
})();
