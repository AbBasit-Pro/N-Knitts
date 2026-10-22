import fs from "fs";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export async function saveUploadedFile(file: File): Promise<UploadResult> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Invalid file type: ${file.type}. Allowed formats: JPEG, PNG, WEBP, GIF, AVIF.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: "File size exceeds 10MB limit.",
    };
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const extension = path.extname(file.name) || ".jpg";
  const cleanBase = path.basename(file.name, extension).replace(/[^a-zA-Z0-9_-]/g, "_");
  const uniqueName = `${cleanBase}_${Date.now()}${extension}`;
  const filePath = path.join(uploadDir, uniqueName);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(filePath, buffer);

  return {
    success: true,
    url: `/uploads/${uniqueName}`,
    filename: uniqueName,
  };
}
