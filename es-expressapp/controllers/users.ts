import { Request, Response } from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await db.one(
    "SELECT * FROM users WHERE username = $1",
    username
  );

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };
    const { SECRET = "" } = process.env;

    const token = jwt.sign(payload, SECRET);

    await db.none("UPDATE users SET token = $2 WHERE id = $1", [
      user.id,
      token,
    ]);
    res.status(200).json({ id: user.id, username, token });
  } else {
    res.status(400).json({ message: "Username o password non validi." });
  }
}

export async function logOut(req: Request, res: Response) {
  const user: any = req.user;

  await db.none("UPDATE users SET token = NULL WHERE id = $1", [user?.id, null]);

  res.status(200).json({ message: "Logout effettuato con successo." });
}

export async function signUp(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await db.oneOrNone(
    "SELECT * FROM users WHERE username = $1",
    username
  );

  if (user) {
    res.status(400).json({ message: "Utente già presente" });
  } else {
    const { id } = await db.one(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, password]
    );

    res.status(201).json({ id, message: "Utente creato con successo!" });
  }
}
