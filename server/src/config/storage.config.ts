import multer from "multer";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import type { Readable } from "stream";

const {
  S3_BUCKET,
  S3_REGION,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_ENDPOINT,
} = process.env;

const generateFilename = (file: Express.Multer.File): string => {
  return `${Date.now()}-${file.originalname}`
    .replaceAll(/\s+/g, "-")
    .toLowerCase();
};

let storage: multer.Multer;
let s3Client: S3Client | null = null;
let isS3Enabled = false;

if (S3_BUCKET && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY) {
  console.log(`> Storage: S3 (bucket: ${S3_BUCKET})`);
  isS3Enabled = true;

  s3Client = new S3Client({
    region: S3_REGION || "eu-west-3",
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
    ...(S3_ENDPOINT && { endpoint: S3_ENDPOINT, forcePathStyle: true }),
  });

  storage = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: S3_BUCKET,
      key: (_, file, cb) => cb(null, `uploads/${generateFilename(file)}`),
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });
} else {
  console.warn("> Storage: Local disk (S3 not configured)");

  storage = multer({
    storage: multer.diskStorage({
      destination: (_, __, cb) => cb(null, "public/uploads"),
      filename: (_, file, cb) => cb(null, generateFilename(file)),
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });
}

// Retourne l'URL complète via le proxy backend
export const getFileUrl = (file: Express.Multer.File, baseUrl: string): string => {
  const filename = isS3Enabled
    ? ((file as any).key as string).replace("uploads/", "")
    : file.filename;
  return `${baseUrl}/api/files/${filename}`;
};

// Récupère un fichier depuis S3
export const getFileFromS3 = async (
  filename: string,
): Promise<{ stream: Readable; contentType: string } | null> => {
  if (!s3Client || !S3_BUCKET) return null;

  try {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: `uploads/${filename}`,
    });
    const response = await s3Client.send(command);
    return {
      stream: response.Body as Readable,
      contentType: response.ContentType || "application/octet-stream",
    };
  } catch {
    return null;
  }
};

export { isS3Enabled, s3Client };
export default storage;
