import { NextFunction, Request, Response } from "express";
import passport from "passport";

export default function authorize(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined) => {
      if (!user || err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
}
