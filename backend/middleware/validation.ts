import Joi from "joi";
import { Request, Response, NextFunction } from "express";

interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // optional, admin may generate
  age?: number;
  course?: string;
  profilePic?: string; // optional, for student profile picture
}
interface LoginData {
  email: string;
  password: string;
}

interface ValidatedRequest<T = any> extends Request {
  validatedBody: T;
}
// Admin creates a student
const adminCreateStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  lastName: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(), // admin may skip, generate temp
  age: Joi.number().integer().min(10).max(100).optional(),
  course: Joi.string().min(2).max(255).optional(),
});

// Student updates only profile picture
const updateProfilePicSchema = Joi.object({
  profilePic: Joi.string().required(),
});

// Login schema
const loginSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Generic validation middleware
const validate =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({ success: false, errors });
    }

    (req as ValidatedRequest<T>).validatedBody = value;
    next();
  };

// Export validators
export const validateLogin = validate(loginSchema);
export const validateAdminCreateStudent = validate(adminCreateStudentSchema);
export const validateUpdateProfilePic = validate(updateProfilePicSchema);

export type { StudentData, LoginData, ValidatedRequest };
