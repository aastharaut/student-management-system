// import { Router, Request, Response, NextFunction } from "express";
// import jsonwebtoken from "jsonwebtoken";

// export const checkAuthentication = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   let loggedIn = false;

//   if (req.headers.authorization) {
//     let token = req.headers.authorization.split(" ")[1]; // Bearer token splitting
//     console.log("Token received in middleware:", token);

//     if (token) {
//       let tokenValid = jsonwebtoken.verify(token, process.env.JWT_SECRET || "");
//       if (tokenValid) {
//         loggedIn = true;
//       }
//     }
//   }

//   if (loggedIn) {
//     next();
//   } else {
//     res.status(401).json({
//       msg: "Unauthenticated access denied",
//     });
//   }
// };

// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        msg: "Unauthenticated access denied - No token provided",
      });
    }

    // Check if it's a Bearer token
    if (!req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        msg: "Unauthenticated access denied - Invalid token format",
      });
    }

    // Extract token
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token received in middleware:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Unauthenticated access denied - No token provided",
      });
    }

    // Get JWT secret
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        success: false,
        msg: "Server configuration error",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;
    console.log("Authenticated user:", decoded);

    // Proceed to next middleware/route handler
    next();
  } catch (error) {
    // Handle different JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        msg: "Unauthenticated access denied - Invalid token",
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        msg: "Unauthenticated access denied - Token expired",
      });
    }

    // Handle other errors
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error during authentication",
    });
  }
};

// Role-based authorization middleware
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if user exists (should be attached by checkAuthentication)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "Unauthenticated",
      });
    }

    // Check if user role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        msg: "Access denied. You don't have permission to perform this action.",
      });
    }

    next();
  };
};
