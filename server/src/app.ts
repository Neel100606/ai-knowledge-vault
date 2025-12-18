import express, {Application} from 'express';
import cors from "cors";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy 🚀" });
});

export default app;

