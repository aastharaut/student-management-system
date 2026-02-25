import { Request, Response, NextFunction } from "express";
import resourceNotFoundHandler from "./resourceNotFoundHandler";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
}

export default errorHandler;
