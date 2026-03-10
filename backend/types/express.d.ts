import { Request } from "express";

export interface AuthRequest extends Request {
  user: {
    id: number;
    email: string;
    roles: string;
    firstName: string;
    lastName: string;
  };
}
