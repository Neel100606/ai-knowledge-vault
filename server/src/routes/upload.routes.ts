import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { uploadDocumentController } from "../controllers/upload.controller";

const router = Router();

/**
 * POST /upload
 */
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  async (req: AuthRequest, res) => {
    try {
      const userId = req.userId!;
      const file = req.file!;

      const document = await uploadDocumentController(userId, file);

      res.status(201).json({
        message: "File uploaded successfully",
        document,
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({
        message: error.message || "Upload failed",
      });
    }
  }
);

export default router;
