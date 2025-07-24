import express from "express";
import { logIn, logOut, signUp } from "../controllers/users";
import authorize from "../middlewares/authorize.js";

export const router = express.Router();

router.post("/login", logIn);
router.get("/logout", authorize, logOut);
router.post("/signup", signUp);
