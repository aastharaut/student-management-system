import { Request, Response, NextFunction } from "express";
import authService from "../services/authServices";
import User from "../models/User";

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authService.login(req);

      if (data) {
        // All user fields are in data except token
        const { token, ...user } = data;
        res.json({ success: true, user, token });
      } else {
        res.status(401).json({
          success: false,
          msg: "Invalid credentials",
        });
      }
    } catch (err: any) {
      next(err);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const user = await User.findByPk(req.user.id);
      if (!user)
        return res.status(404).json({ success: false, msg: "User not found" });
      res.json({ success: true, data: user });
    } catch (err: any) {
      next(err);
    }
  },
};

export default authController;
