import { Request } from "express";
import User from "../models/User";

export default {
  signup: async (req: Request) => {
    return await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
  },
  login: async (req: Request) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
