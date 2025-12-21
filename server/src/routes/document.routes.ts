import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import {
  createDocumentController,
  getMyDocumentsController,
  getDocumentByIdController,
} from "../controllers/document.controller";

const router = Router();

/**
 * POST /documents
 * Create a document
 */
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, content, type } = req.body;
      const userId = req.userId!;

      const document = await createDocumentController(
        userId,
        title,
        content,
        type
      );

      return res.status(201).json({
        message: "Document created",
        document,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to create document",
      });
    }
  }
);

/**
 * GET /documents
 * Get all documents of logged-in user
 */
router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const documents = await getMyDocumentsController(userId);

      return res.status(200).json({
        documents,
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch documents",
      });
    }
  }
);

/**
 * GET /documents/:id
 * Get single document (ownership enforced)
 */
router.get(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const documentId = req.params.id;

      const document = await getDocumentByIdController(
        documentId,
        userId
      );

      return res.status(200).json({
        document,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message || "Document not found",
      });
    }
  }
);

export default router;
