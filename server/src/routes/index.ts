import { Router } from "express";
import authRouter from "./auth";
import sharedRouter from "./shared";
import cmsRouter from "./cms";
import articlesRouter from "./articles";
import filesRouter from "./shared/files";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "Hello from the server!",
  });
});

router.use("/auth", authRouter);
router.use("/shared", sharedRouter);
router.use("/cms", cmsRouter);
router.use("/articles", articlesRouter);
router.use("/files", filesRouter);

export default router;
