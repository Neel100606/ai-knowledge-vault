export interface Document {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: "note" | "email";
  created_at: Date;
  updated_at: Date;
}
