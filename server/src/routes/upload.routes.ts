import { Router } from "express";
import cloudinary from "../config/cloudinary";
import { upload } from "../middlewares/upload.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * POST /upload
 * Test Cloudinary upload
 */
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error || !result) {
            return res.status(500).json({ message: "Upload failed" });
          }

          res.json({
            url: result.secure_url,
            public_id: result.public_id,
            type: result.resource_type,
          });
        }
      );

      result.end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ message: "Upload error" });
    }
  }
);

export default router;
