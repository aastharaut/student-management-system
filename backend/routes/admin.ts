import { Router } from "express";
import adminController from "../controllers/adminController";
import { checkAuthentication } from "../middleware/auth";
import { checkAdmin } from "../middleware/role";

const router = Router();

router.use(checkAuthentication, checkAdmin);

router.get("/students", adminController.getAllStudents);
router.get("/students/:id", adminController.getStudentById); //to get individual student
router.post("/students", adminController.createStudent);
router.put("/students/:id", adminController.updateStudent);
router.delete("/students/:id", adminController.deleteStudent);

router.get("/dashboard", adminController.getDashboard);

export default router;
