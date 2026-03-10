// import { Router } from "express";
// import { checkAuthentication } from "../middleware/auth";

// const router = Router();

// // Student can only access their own data
// router.use(checkAuthentication);

// // Get current student profile
// router.get("/me", async (req: any, res) => {
//   try {
//     res.json({ success: true, data: req.user });
//   } catch (error: any) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// });

// export default router;
import { Router } from "express";
import { checkAuthentication } from "../middleware/auth";
import User from "../models/User"; // or User model if unified

const router = Router();

// Student can only access their own data
router.use(checkAuthentication);

// Get current student profile
router.get("/me", async (req: any, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Update current student's profile picture
router.put("/me", async (req: any, res) => {
  try {
    const currentUser = req.user;

    // Only allow students to update their own profile picture
    if (currentUser.role !== "STUDENT") {
      return res.status(403).json({ success: false, msg: "Not allowed" });
    }

    const { profilePicture } = req.body;

    if (!profilePicture) {
      return res
        .status(400)
        .json({ success: false, msg: "Profile picture required" });
    }

    // Update in DB
    await User.update({ profilePicture }, { where: { id: currentUser.id } });

    res.json({ success: true, msg: "Profile picture updated successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

export default router;
