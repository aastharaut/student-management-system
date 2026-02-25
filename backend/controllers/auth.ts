import { Request, Response, NextFunction } from "express";
import authService from "../services/authServices";

const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.signup(req.body);
      res.send("User registered successfully");
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  },
};
export default authController;
