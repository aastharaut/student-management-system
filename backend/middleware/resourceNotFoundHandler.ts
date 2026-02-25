import { Request, Response, NextFunction } from "express";

function resourceNotFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({ message: "Resource not found" });
}

export default resourceNotFoundHandler;
