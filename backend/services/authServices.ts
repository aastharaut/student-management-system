import { Request } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import User from "../models/User";

export default {
  signup: async (req: Request) => {
    let hashed = await bcrypt.hash(req.body.password, 10);
    return await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isSeller: req.body.isSeller,
      password: hashed,
    });
  },

  login: async (req: Request) => {
    // Find user by email
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      let userData = user.toJSON();

      // Compare passwords
      let passwordMatched = await bcrypt.compare(
        req.body.password,
        userData.password,
      );

      if (!passwordMatched) {
        return false;
      }
      delete userData.password;
      delete userData.createdAt;
      delete userData.updatedAt;

      //jwt token
      let token = jsonwebtoken.sign(
        {
          id: userData.id,
          email: userData.email,
          role: userData.role,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "1h",
        },
      );

      console.log("Token generated:", token);

      return {
        ...userData,
        token,
      };
    }

    return false;
  },
};
