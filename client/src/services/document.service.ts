import { api } from "./api";

export const createDocument = async (
  title: string,
  content: string,
  type: "note" | "email"
) => {
  const res = await api.post("/documents/", {
    title,
    content,
    type,
  });
  return res.data;
};

export const getMyDocuments = async () => {
  const res = await api.get("/documents");
  return res.data.documents;
};
