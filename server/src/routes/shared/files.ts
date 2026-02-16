import { Router } from "express";
import path from "path";
import fs from "fs";
import { isS3Enabled, getFileFromS3 } from "../../config/storage.config";

const filesRouter = Router();

// Proxy pour servir les fichiers (local ou S3)
filesRouter.get("/:filename", async (req, res) => {
  const { filename } = req.params;

  // Validation basique du filename
  if (!filename || filename.includes("..") || filename.includes("/")) {
    res.status(400).json({ message: "Invalid filename" });
    return;
  }

  if (isS3Enabled) {
    // Mode S3 : récupérer depuis MinIO/S3
    const file = await getFileFromS3(filename);
    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    res.setHeader("Content-Type", file.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000");
    file.stream.pipe(res);
  } else {
    // Mode local : servir depuis public/uploads
    const filePath = path.resolve("public/uploads", filename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.sendFile(filePath);
  }
});

export default filesRouter;
