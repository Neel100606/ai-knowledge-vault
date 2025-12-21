import { Router, Request, Response } from "express";
import { signup, login } from "../controllers/auth.controller";
import { signAccessToken, verifyRefreshToken } from "../utils/jwt";

const router = Router();

/**
 * Cookie options (shared)
 */
const cookieOptions = {
  httpOnly: true,
  secure: false, // ⚠️ set true in production (HTTPS)
  sameSite: "strict" as const,
};

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

    const result = await signup(email, password);

    return res
      .cookie("access_token", result.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refresh_token", result.refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: result.user, // ✅ tokens NOT sent in JSON
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

    const result = await login(email, password);

    return res
      .cookie("access_token", result.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refresh_token", result.refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        user: result.user, // ✅ tokens NOT sent in JSON
      });

  } catch (error: any) {
    return res.status(401).json({
      message: error.message || "Login failed",
    });
  }
});

router.post("/logout", (_, res) => {
  res
    .clearCookie("access_token", cookieOptions)
    .clearCookie("refresh_token", cookieOptions)
    .json({ success: true });
});


router.post("/refresh", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new Error();

    const decoded = verifyRefreshToken(refreshToken);
    const newAccessToken = signAccessToken(decoded.userId);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ success: true });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

export default router;
