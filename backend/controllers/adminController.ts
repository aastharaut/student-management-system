import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import sequelize from "../connections/database";
import { AuthRequest } from "../types/express";

const adminController = {
  // Get all students
  getAllStudents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await User.findAll({
        where: { roles: "student" },
      });
      res.json({ success: true, data: students });
    } catch (err) {
      next(err);
    }
  },

  // Get single student
  getStudentById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const student = await User.findByPk(id);
      if (!student) {
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" });
      }
      res.json({ success: true, data: student });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Error fetching student" });
    }
  },

  // Create student
  createStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, age, course, password } = req.body;
      const newStudent = await User.create({
        firstName,
        lastName,
        email,
        age,
        course,
        password,
        roles: "student",
        profilePicture: req.file ? (req.file as any).path : null,
      });
      res.status(201).json({ success: true, data: newStudent });
    } catch (err: any) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ success: false, msg: "Email already exists" });
      }
      next(err);
    }
  },

  // Update any student (admin)
  updateStudent: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // If a new profile picture was uploaded, include it in the updates
      if (req.file) {
        updates.profilePicture = (req.file as any).path;
      }
      //   if (req.file) {
      //     updates.profilePicture = `/uploads/profiles/${req.file.filename}`;
      //   }
      const student = await User.findOne({ where: { id, roles: "student" } });
      if (!student) {
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" });
      }

      const updated = await student.update(updates);
      res.json({ success: true, data: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },
  // Get own profile (admin)
  getProfile: async (req: Request, res: Response) => {
    try {
      const { user: currentUser } = req as AuthRequest;
      const user = await User.findByPk(currentUser.id);
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  //update own profile (admin)
  updateProfile: async (req: Request, res: Response) => {
    try {
      const { user: currentUser } = req as AuthRequest;
      const updates = req.body;

      //handle uploaded profile picture
      //   if (req.file) {
      //     updates.profilePicture = `/uploads/profiles/${req.file.filename}`;
      //   }
      if (req.file) {
        console.log("Cloudinary URL:", req.file.path);
        updates.profilePicture = (req.file as any).path;
      }

      const user = await User.findByPk(currentUser.id);
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }
      const updated = await user.update(updates);
      res.json({ success: true, data: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Delete student
  deleteStudent: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student = await User.findOne({ where: { id, roles: "student" } });
      if (!student) {
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" });
      }
      await student.destroy();
      res.json({ success: true, msg: "Student deleted" });
    } catch (err) {
      res.status(500).json({ success: false, msg: "Error deleting student" });
    }
  },

  // Dashboard analytics
  getDashboard: async (req: Request, res: Response) => {
    try {
      const totalStudents = await User.count({ where: { roles: "student" } });
      const studentsPerCourse = await User.findAll({
        attributes: [
          "course",
          [sequelize.fn("COUNT", sequelize.col("course")), "count"],
        ],
        where: { roles: "student" },
        group: ["course"],
      });
      res.json({ success: true, totalStudents, studentsPerCourse });
    } catch (err) {
      res.status(500).json({ success: false, msg: "Error fetching dashboard" });
    }
  },
};

export default adminController;
