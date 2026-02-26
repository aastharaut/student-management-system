import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
    }
  }
}
import { StudentData } from "../middleware/validation";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: StudentData;
      user?: any;
    }
  }
}
