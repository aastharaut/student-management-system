import { Router } from "express";
import { checkAuthentication } from "../middleware/auth";
import User from "../models/User";
import upload from "../middleware/upload";
//import multer from "multer";
//import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/profiles"),
//   filename: (req, file, cb) => {
//     const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${unique}${path.extname(file.originalname)}`);
//   },
// });
// const upload = multer({ storage });
const router = Router();

router.use(checkAuthentication); // Student can only access their own data

// Get current student profile
router.get("/profile", async (req: any, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, msg: "User not found" });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Update current student's profile picture

router.put(
  "/profile",
  upload.single("profilePicture"),
  async (req: any, res) => {
    try {
      const currentUser = req.user;
      if (currentUser.roles !== "student") {
        return res.status(403).json({ success: false, msg: "Not allowed" });
      }

      const updates: any = {};
      if (req.file) {
        updates.profilePicture = (req.file as any).path;
      }
      if (Object.keys(updates).length === 0) {
        return res
          .status(400)
          .json({ success: false, msg: "Nothing to update" });
      }
      const user = await User.findByPk(currentUser.id); //fetch user
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }

      const updated = await user.update(updates);
      res.json({ success: true, data: updated }); //return full updated user
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },
);
export default router;
