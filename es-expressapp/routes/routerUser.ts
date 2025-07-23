import express from "express";
import { logIn } from "../controllers/users";

export const router = express.Router();

router.post("/", logIn);