// import { Request } from "express";
// import bcrypt from "bcrypt";
// import jsonwebtoken from "jsonwebtoken";
// import User from "../models/User";

// export default {
//   login: async (req: Request) => {
//     // Find user by email
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (!user) return false;

//     const userData = user.toJSON();

//     // Compare passwords
//     const passwordMatched = await bcrypt.compare(
//       req.body.password,
//       userData.password,
//     );
//     if (!passwordMatched) return false;

//     // Remove sensitive fields
//     delete userData.password;
//     delete userData.createdAt;
//     delete userData.updatedAt;

//     // Generate JWT
//     const token = jsonwebtoken.sign(
//       {
//         id: userData.id,
//         email: userData.email,
//         roles: userData.roles,
//       },
//       process.env.JWT_SECRET || "",
//       { expiresIn: "7d" },
//     );

//     console.log("Token generated:", token);

//     return {
//       ...userData,
//       token,
//     };
//   },
// };

import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface UserData {
  id: number;
  email: string;
  password: string;
  roles: string;
}

export default {
  login: async (req: Request) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return false;

    const userData = user.toJSON() as UserData;

    const passwordMatched = await bcrypt.compare(password, userData.password);
    if (!passwordMatched) return false;

    delete (userData as any).password;

    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        roles: userData.roles, // "admin" or "student"
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" },
    );

    console.log("Token generated:", token);

    return {
      ...userData,
      token,
    };
  },
};
