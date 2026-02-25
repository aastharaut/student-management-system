import { Request } from "express";
import User from "../models/User";

export default {
  signup: async (req: Request) => {
    return await User.create({
      firstName: "aastha",
      lastName: "raut",
      email: "aastharaut03@gmail.com",
      password: "password123",
      role: "admin",
    });
  },
};
