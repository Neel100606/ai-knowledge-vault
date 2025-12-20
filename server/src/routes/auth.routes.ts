import { Router, Request, Response } from "express";
import { signup, login } from "../controllers/auth.controller";

const router = Router();

/**
 * POST /auth/signup
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await signup(email, password);

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Signup failed",
    });
  }
});

/**
 * POST /auth/login
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await login(email, password);

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message || "Login failed",
    });
  }
});

export default router;
