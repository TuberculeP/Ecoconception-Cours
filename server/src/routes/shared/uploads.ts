import { Router } from "express";
import pg from "../../config/db.config";
import { Upload } from "../../config/entities/Upload";
import storage, { getFileUrl } from "../../config/storage.config";

const uploadsRouter = Router();

uploadsRouter.post("/", storage.single("file"), async (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const file = req.file;
  if (!file) {
    res.status(400).json({ message: "No file provided" });
    return;
  }

  // Construire le baseUrl depuis la requête
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  const baseUrl = `${protocol}://${host}`;

  const url = getFileUrl(file, baseUrl);

  const uploadRepository = pg.getRepository(Upload);
  const upload = new Upload();
  upload.filename = file.filename || (file as any).key;
  upload.url = url;
  upload.user = req.user;
  await uploadRepository.save(upload);

  res.status(201).json({
    message: "File uploaded successfully",
    url,
  });
});

export default uploadsRouter;
