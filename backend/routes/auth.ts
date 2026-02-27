import { Router } from "express";
import authController from "../controllers/auth";
import { validateLogin, validateRegister } from "../middleware/validation";

const router = Router();

router.post("/signup", validateRegister, authController.signup);
router.post("/login", validateLogin, authController.login);

export default router;
