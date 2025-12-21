import express, {Application} from 'express';
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";

import { authMiddleware } from "./middlewares/auth.middleware";
import cookieParser from "cookie-parser";


const app: Application = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 EXACT frontend origin
    credentials: true,               // 👈 REQUIRED for cookies
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/documents", documentRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: (req as any).userId,
  });
});


export default app;

