import { Request, Response, NextFunction } from "express";
import authService from "../services/authServices";

const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await authService.signup(req);
      console.log({ user });
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authService.login(req);

      if (data) {
        const { token, ...user } = data;
        res.send({ user, token });
      } else {
        res.status(401).send({ msg: "Invalid credentials" });
      }
    } catch (err) {
      next(err);
    }
  },
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send({
        // @ts-ignore
        data: req.user,
      });
    } catch (err) {
      next(err);
    }
  },
};
export default authController;
