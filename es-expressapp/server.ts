import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

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

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).json({ error: "Oh no. Il pianeta non esiste. :(" });
  }
});

app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];
  res
    .status(201)
    .json({ message: `Il pianeta ${name} con id ${id} è stato creato con successo e inserito! :)` });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ message: "Pianeta aggiornato!" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ message: "Pianeta eliminato!" });
});

app.listen(PORT, () => {
  console.log(`Server funzionante su http://localhost:${PORT}`);
});
