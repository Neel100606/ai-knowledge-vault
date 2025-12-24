import pool from "../config/db";
import { Document } from "../types/document";

export const createDocument = async (
  userId: string,
  title: string,
  content: string,
  type: "note" | "email" | "pdf" | "file",
  fileUrl?: string,
  mimeType?: string
): Promise<Document> => {
  const query = `
    INSERT INTO documents (user_id, title, content, type, file_url, mime_type)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    userId,
    title,
    content,
    type,
    fileUrl || null,
    mimeType || null,
  ];

  const { rows } = await pool.query<Document>(query, values);
  return rows[0];
};
