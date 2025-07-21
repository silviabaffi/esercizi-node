import { Request, Response } from "express";
import db from "../db.js";

type Planet = {
  id: number;
  name: string;
};

// type Planets = Planet[];

// let planets: Planets = [
//   {
//     id: 1,
//     name: "Earth",
//   },
//   {
//     id: 2,
//     name: "Mars",
//   },
// ];

export async function getAll(req: Request, res: Response) {
  const planets: Planet[] = await db.many("SELECT * FROM planets");
  res.status(200).json(planets);
}

export async function getOneById(req: Request, res: Response) {
  const { id } = req.params;
  const planet = await db.oneOrNone("SELECT * FROM planets WHERE id = $1", [
    id,
  ]);
  // const planet = planets.find((p) => p.id === Number(id));
  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).json({ error: "Oh no. Il pianeta non esiste. :(" });
  }
}

export async function create(req: Request, res: Response) {
  const { id, name } = req.body;
  await db.none("INSERT INTO planets (name) VALUES ($1)", [name]);
  // const newPlanet = { id, name };
  // planets = [...planets, newPlanet];
  res.status(201).json({
    message: `Il pianeta ${name} con id ${id} è stato creato con successo e inserito! :)`,
  });
}

export async function updateById(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  const result = await db.result("UPDATE planets SET name = $2 WHERE id = $1", [
    name,
    id,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Pianeta non trovato. :(" });
  }
  // planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ message: "Pianeta aggiornato!" });
}

export async function deleteById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await db.result("DELETE FROM planets WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    return res.status(400).json({ message: "Pianeta non trovato. :(" });
  }
  // planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ message: "Pianeta eliminato!" });
}
