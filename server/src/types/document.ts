export interface Document {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  type: "note" | "email" | "pdf" | "file";
  file_url?: string | null;
  mime_type?: string | null;
  created_at: Date;
  updated_at: Date;
}
