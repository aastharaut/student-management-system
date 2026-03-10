import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import sequelize from "../connections/database";

const adminController = {
  // Get all students
  getAllStudents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await User.findAll({
        where: {
          roles: "student",
        },
      });

      res.json({ success: true, data: students });
    } catch (err) {
      next(err);
    }
  },

  // Create a new student
  createStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, age, course, password } = req.body;

      const newStudent = await User.create({
        firstName,
        lastName,
        email,
        age,
        course,
        password: password, // hash in service or middleware
        roles: "student",
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

  // Update student
  updateStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const student = await User.findOne({ where: { id, role: "student" } });
      if (!student)
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" });

      const updated = await student.update(req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  // Delete student
  deleteStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const student = await User.findOne({ where: { id, role: "student" } });
      if (!student)
        return res
          .status(404)
          .json({ success: false, msg: "Student not found" });

      await student.destroy();
      res.json({ success: true, msg: "Student deleted" });
    } catch (err) {
      next(err);
    }
  },

  // Dashboard analytics
  getDashboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // total students
      const totalStudents = await User.count({
        where: { roles: "student" },
      });

      // students per course
      const studentsPerCourse = await User.findAll({
        attributes: [
          "course",
          [sequelize.fn("COUNT", sequelize.col("course")), "count"],
        ],
        where: { roles: "student" },
        group: ["course"],
      });

      res.json({
        success: true,
        totalStudents,
        studentsPerCourse,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default adminController;
