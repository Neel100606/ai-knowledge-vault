import pool from "../config/db";
import { Document } from "../types/document";

/**
 * Create a document
 */
export const createDocument = async ( userId: string, title: string, content: string, type: "note" | "email"): Promise<Document> => {
  const query = `
    INSERT INTO documents (user_id, title, content, type)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [userId, title, content, type];

  const { rows } = await pool.query<Document>(query, values);
  return rows[0];
};

/**
 * Get all documents for a user
 */
export const getDocumentsByUser = async (
  userId: string
): Promise<Document[]> => {
  const query = `
    SELECT *
    FROM documents
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query<Document>(query, [userId]);
  return rows;
};

/**
 * Get single document by id (USER-SCOPED)
 */
export const getDocumentById = async (
  documentId: string,
  userId: string
): Promise<Document | null> => {
  const query = `
    SELECT *
    FROM documents
    WHERE id = $1 AND user_id = $2;
  `;

  const { rows } = await pool.query<Document>(query, [
    documentId,
    userId,
  ]);

  return rows[0] || null;
};
