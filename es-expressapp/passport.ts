import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import db from "./db";

dotenv.config();
const secret = process.env.SECRET || "";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // il token lo prendiamo dalla header di autenticazione
  secretOrKey: secret,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
