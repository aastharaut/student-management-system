import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuthentication = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded; // attach decoded JWT to req.user
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
