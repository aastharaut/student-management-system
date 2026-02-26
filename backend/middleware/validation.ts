import Joi from "joi";
import { Request, Response, NextFunction } from "express";

interface StudentData {
  name: string;
  email: string;
  age: number;
  course: string;
  enrollmentDate?: Date;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "teacher" | "viewer";
}

interface LoginData {
  email: string;
  password: string;
}

// Extend Request with typed validatedBody
interface ValidatedRequest<T = any> extends Request {
  validatedBody: T;
}

const studentSchema = Joi.object<StudentData>({
  name: Joi.string().min(2).max(255).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 255 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  age: Joi.number().integer().min(10).max(100).required().messages({
    "number.min": "Age must be at least 10",
    "number.max": "Age cannot exceed 100",
    "any.required": "Age is required",
  }),
  course: Joi.string().min(2).max(255).required().messages({
    "string.min": "Course must be at least 2 characters long",
    "any.required": "Course is required",
  }),
  enrollmentDate: Joi.date().optional(),
});

const updateStudentSchema = Joi.object<Partial<StudentData>>({
  name: Joi.string().min(2).max(255),
  email: Joi.string().email(),
  age: Joi.number().integer().min(10).max(100),
  course: Joi.string().min(2).max(255),
  enrollmentDate: Joi.date().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

const registerSchema = Joi.object<RegisterData>({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "teacher", "viewer").default("viewer"),
});

const loginSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Generic validator factory
const validate =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Type assertion to add validatedBody
    (req as ValidatedRequest<T>).validatedBody = value;
    next();
  };

export const validateStudent = validate(studentSchema);
export const validateUpdateStudent = validate(updateStudentSchema);
export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);

// Export types for use in controllers
export type { StudentData, RegisterData, LoginData, ValidatedRequest };
