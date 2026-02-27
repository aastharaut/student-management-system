import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import {
  ConnectionError,
  DatabaseError,
  TimeoutError,
  UniqueConstraintError,
  ValidationError,
} from "sequelize";

function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    let errors = err.errors.map((el) => {
      return {
        field: el.path,
        message: el.message,
      };
    });
    return res.status(400).send({
      msg: "Bad Request",
      errors,
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(500).send({
      msg: err.message,
    });
  }

  if (err instanceof ConnectionError || err instanceof TimeoutError) {
    return res.status(503).send({
      msg: err.message,
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).send({
      msg: "Invalid or expired token",
    });
  }

  console.log(err);
  res.status(500).send({ msg: "server error" });
}

export default errorHandler;
