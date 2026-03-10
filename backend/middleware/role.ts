import { Request, Response, NextFunction } from "express";

export const checkAdmin = (req: any, res: Response, next: NextFunction) => {
  if (!req.user || req.user.roles !== "admin") {
    return res.status(403).json({ msg: "Admin only" });
  }
  next();
};
