import {
  createDocument,
  getDocumentsByUser,
  getDocumentById,
} from "../db/document.queries";
import { Document } from "../types/document";

/**
 * Create a new document
 */
export const createDocumentController = async (
  userId: string,
  title: string,
  content: string,
  type: "note" | "email"
): Promise<Document> => {
  if (!title || !content || !type) {
    throw new Error("Missing required fields");
  }

  const document = await createDocument(
    userId,
    title,
    content,
    type
  );

  return document;
};

/**
 * Get all documents for authenticated user
 */
export const getMyDocumentsController = async (
  userId: string
): Promise<Document[]> => {
  return await getDocumentsByUser(userId);
};

/**
 * Get single document by id (ownership enforced)
 */
export const getDocumentByIdController = async (
  documentId: string,
  userId: string
): Promise<Document> => {
  const document = await getDocumentById(documentId, userId);

  if (!document) {
    throw new Error("Document not found");
  }

  return document;
};
