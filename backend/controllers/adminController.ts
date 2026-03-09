import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import sequelize from "../connections/database";

const adminController = {
  // Get all pending students
  getPendingStudents: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const students = await User.findAll({
        where: {
          role: "student",
          status: "pending",
        },
      });

      res.send(students);
    } catch (err) {
      next(err);
    }
  },

  // Approve student
  approveStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await User.update({ status: "approved" }, { where: { id } });

      res.send({ msg: "Student approved successfully" });
    } catch (err) {
      next(err);
    }
  },

  // Reject student
  rejectStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await User.update({ status: "rejected" }, { where: { id } });

      res.send({ msg: "Student rejected successfully" });
    } catch (err) {
      next(err);
    }
  },

  // Get all approved students
  getAllStudents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await User.findAll({
        where: {
          role: "student",
          status: "approved",
        },
      });

      res.send(students);
    } catch (err) {
      next(err);
    }
  },

  // Dashboard analytics
  getDashboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // total approved students
      const totalStudents = await User.count({
        where: {
          role: "student",
          status: "approved",
        },
      });

      // students per course
      const studentsPerCourse = await User.findAll({
        attributes: [
          "course",
          [sequelize.fn("COUNT", sequelize.col("course")), "count"],
        ],
        where: {
          role: "student",
          status: "approved",
        },
        group: ["course"],
      });

      res.send({
        totalStudents,
        studentsPerCourse,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default adminController;
