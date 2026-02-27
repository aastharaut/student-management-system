import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Student from "../models/Student";
import {
  validateStudent,
  ValidatedRequest,
  StudentData,
} from "../middleware/validation";

const router = Router();

// Authentication middleware
const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      msg: "Unauthenticated access denied - No token provided",
    });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Unauthenticated access denied",
    });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request
    (req as any).user = decoded;
    console.log("Authenticated user:", decoded);

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({
      success: false,
      msg: "Unauthenticated access denied - Invalid token",
    });
  }
};

// This must come BEFORE any route definitions
router.use(checkAuthentication);

// ALL routes below this line are now protected
// Get all students
router.get("/students", (req: Request, res: Response) => {
  const user = (req as any).user;

  res.json({
    success: true,
    msg: "Get all students",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

// // Create a new student with validation
// router.post(
//   "/students",
//   validateStudent,
//   async (req: Request, res: Response) => {
//     const user = (req as any).user;
//     const studentData = (req as unknown as ValidatedRequest<StudentData>)
//       .validatedBody;

//     console.log("Creating student:", studentData);
//     console.log("Created by user:", user);

//     res.status(201).json({
//       success: true,
//       msg: "Student created successfully",
//       data: {
//         student: studentData,
//         createdBy: {
//           id: user.id,
//           email: user.email,
//         },
//       },
//     });
//   },
// );
router.post(
  "/students",
  validateStudent,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const studentData = (req as unknown as ValidatedRequest<StudentData>)
        .validatedBody;

      console.log("Creating student:", studentData);
      console.log("Created by user:", user);

      const newStudent = await Student.create({
        name: studentData.name,
        email: studentData.email,
        age: studentData.age,
        course: studentData.course,
        enrollmentDate: studentData.enrollmentDate || new Date(),
      });

      console.log(
        "Student saved to DB with ID:",
        newStudent.getDataValue("id"),
      );
      console.log("Saved student data:", newStudent.toJSON());

      res.status(201).json({
        success: true,
        msg: "Student created successfully",
        data: {
          student: newStudent, //has id, createdAt, updatedAt
          createdBy: {
            id: user.id,
            email: user.email,
          },
        },
      });
    } catch (error: any) {
      console.error("Error creating student:", error);

      // Handle specific errors
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          msg: "Email already exists",
        });
      }

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          msg: "Validation error",
          errors: error.errors.map((e: any) => e.message),
        });
      }

      res.status(500).json({
        success: false,
        msg: "Error creating student",
        error: error.message,
      });
    }
  },
);

// Get student by ID
router.get("/students/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  res.json({
    success: true,
    msg: `Get student with id ${id}`,
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

// Update student
router.put("/students/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  res.json({
    success: true,
    msg: `Update student with id ${id}`,
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

// Delete student
router.delete("/students/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  res.json({
    success: true,
    msg: `Delete student with id ${id}`,
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

export default router;
