import { Request, Response } from "express";

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

export function getAll(req: Request, res: Response) {
  res.status(200).json(planets);
}

export function getOneById(req: Request, res: Response) {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).json({ error: "Oh no. Il pianeta non esiste. :(" });
  }
}

export function create(req: Request, res: Response) {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];
  res.status(201).json({
    message: `Il pianeta ${name} con id ${id} è stato creato con successo e inserito! :)`,
  });
}

export function updateById(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ message: "Pianeta aggiornato!" });
}

export function deleteById(req: Request, res: Response) {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ message: "Pianeta eliminato!" });
}
