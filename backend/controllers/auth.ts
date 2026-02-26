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
      let user = await authService.login(req);

      if (user) {
        res.send(user);
      } else {
        res.status(401).send({
          msg: "invalid credentials",
        });
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
