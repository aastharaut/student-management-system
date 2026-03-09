import { Router } from "express";
import authController from "../controllers/auth";
import { checkAuthentication } from "../middleware/auth";
import { validateLogin } from "../middleware/validation";

const router = Router();

router.post("/login", validateLogin, authController.login);
router.get("/me", checkAuthentication, authController.getUser);

export default router;
