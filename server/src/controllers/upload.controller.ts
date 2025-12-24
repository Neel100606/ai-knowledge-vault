import cloudinary from "../config/cloudinary";
import { createDocument } from "../db/document.queries";
import { extractTextFromPDF } from "../utils/pdf";

export const uploadDocumentController = async (
  userId: string,
  file: Express.Multer.File
) => {

  let content = "";

  // 🔥 Extract PDF text FIRST
  if (file.mimetype === "application/pdf") {
    content = await extractTextFromPDF(file.buffer);
  }

  // 🔥 Upload to Cloudinary
  const uploadResult = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });

  // 🔥 Save to DB
  const document = await createDocument(
    userId,
    file.originalname,
    content,
    file.mimetype === "application/pdf" ? "pdf" : "file",
    uploadResult.secure_url,
    file.mimetype
  );

  return document;
};
