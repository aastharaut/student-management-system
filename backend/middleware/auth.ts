import { Router, Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let loggedIn = false;

  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1]; // Bearer token splitting
    console.log("Token received in middleware:", token);

    if (token) {
      let tokenValid = jsonwebtoken.verify(token, process.env.JWT_SECRET || "");
      if (tokenValid) {
        loggedIn = true;
      }
    }
  }

  if (loggedIn) {
    next();
  } else {
    res.status(401).json({
      msg: "Unauthenticated access denied",
    });
  }
};
