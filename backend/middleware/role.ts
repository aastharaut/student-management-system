import { Request, Response, NextFunction } from "express";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user.role !== "admin") {
    return res.status(403).send({ msg: "Admin only" });
  }

  next();
};
