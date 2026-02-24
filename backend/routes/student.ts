import { Router } from "express";

const router = Router();

router.post("/students", (req, res) => {
  res.send("Create a new student");
});

router.get("/students", (req, res) => {
  res.send("Get all students");
});

export default router;
