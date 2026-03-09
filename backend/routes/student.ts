import { Router } from "express";
import { checkAuthentication } from "../middleware/auth";

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

export default router;
