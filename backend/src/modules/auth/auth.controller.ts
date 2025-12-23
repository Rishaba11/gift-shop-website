import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      userId,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ LOGIN CONTROLLER
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const data = await loginUser(email, password);

    res.json({
      message: "Login successful",
      token: data.token,
      user: data.user,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
