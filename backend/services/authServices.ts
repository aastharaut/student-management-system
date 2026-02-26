import { Request } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export default {
  signup: async (req: Request) => {
    let hashed = await bcrypt.hash(req.body.password, 10);
    return await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
    });
  },
  login: async (req: Request) => {
    let user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      //let hashed_pw = user.getDataValue("password");
      let userData = user.toJSON();
      console.log({ userData });
      delete userData.password;
      delete userData.createdAt;
      delete userData.updatedAt;

      let isMatch = await bcrypt.compare(req.body.password, userData.password);
      if (!isMatch) {
        return false;
      }
      let token = jsonwebtoken.sign(userData, "secretkey");
      console.log({ token });
      return true;
      //     {
      //       id: userData.id,
      //       email: userData.email,
      //       role: userData.role,
      //     },
      //     process.env.JWT_SECRET || "secret",
      //     {
      //       expiresIn: "1h",
      //     },
      //   );
      //   user.setDataValue("token", token);
      //   return user;
    }

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
