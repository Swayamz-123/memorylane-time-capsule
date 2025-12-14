import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // 🔥 REQUIRED for production
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB per file
  },
});
