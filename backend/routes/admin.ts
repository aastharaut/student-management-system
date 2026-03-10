import { Router } from "express";
import adminController from "../controllers/adminController";
import { checkAuthentication } from "../middleware/auth";
import { checkAdmin } from "../middleware/role";
import { validateAdminCreateStudent } from "../middleware/validation";

const router = Router();

router.use(checkAuthentication, checkAdmin);

router.get("/students", adminController.getAllStudents);
router.get("/students/:id", adminController.getStudentById); //to get individual student
router.post(
  "/students",
  validateAdminCreateStudent,
  adminController.createStudent,
);
router.put("/students/:id", adminController.updateStudent);
router.delete("/students/:id", adminController.deleteStudent);
router.put("/profile", adminController.updateProfile);
router.get("/dashboard", adminController.getDashboard);
//router.put("/profile/picture", checkAuthentication, upload.single("profilePicture"), adminController.updateProfilePicture);
export default router;
