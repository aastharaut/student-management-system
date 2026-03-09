import { Request, Response, NextFunction } from "express";
import authService from "../services/authServices";

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authService.login(req);

      if (data) {
        const { token, user } = data;
        res.json({ success: true, user, token });
      } else {
        res.status(401).json({
          success: false,
          msg: "Invalid credentials or account not approved yet",
        });
      }
    } catch (err: any) {
      next(err);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      res.json({ success: true, data: req.user });
    } catch (err: any) {
      next(err);
    }
  },
};

export default authController;
