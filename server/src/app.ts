import express, {Application} from 'express';
import cors from "cors";
import authRoutes from "./routes/auth.routes";

import { authMiddleware } from "./middlewares/auth.middleware";


const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: (req as any).userId,
  });
});


export default app;

