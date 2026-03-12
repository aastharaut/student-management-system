import { Router } from "express";
//import multer from "multer";
//import path from "path";
import adminController from "../controllers/adminController";
import { checkAuthentication } from "../middleware/auth";
import { checkAdmin } from "../middleware/role";
import { validateAdminCreateStudent } from "../middleware/validation";
import upload from "../middleware/upload";
const router = Router();

// Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/profiles");
//   },
//   filename: (req, file, cb) => {
//     const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${unique}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowed = /jpeg|jpg|png/;
//     const valid = allowed.test(path.extname(file.originalname).toLowerCase());
//     valid ? cb(null, true) : cb(new Error("Only image files are allowed"));
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, //
// });

router.use(checkAuthentication, checkAdmin);

router.get("/students", adminController.getAllStudents);
router.get("/students/:id", adminController.getStudentById);
router.post(
  "/students",
  upload.single("profilePicture"), // parses multipart, puts fields in req.body and file in req.file
  validateAdminCreateStudent,
  adminController.createStudent,
);
router.put(
  "/students/:id",
  upload.single("profilePicture"),
  adminController.updateStudent,
);
router.delete("/students/:id", adminController.deleteStudent);
router.get("/profile", adminController.getProfile);
router.put(
  "/profile",
  upload.single("profilePicture"),
  adminController.updateProfile,
);
router.get("/dashboard", adminController.getDashboard);

export default router;
