"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/api/planets", (req, res) => {
    res.status(200).json(planets);
});
app.get("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    if (planet) {
        res.status(200).json(planet);
    }
    else {
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
    planets = planets.map((p) => (p.id === Number(id) ? Object.assign(Object.assign({}, p), { name }) : p));
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
