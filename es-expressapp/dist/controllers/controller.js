"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
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
function getAll(req, res) {
    res.status(200).json(planets);
}
exports.getAll = getAll;
function getOneById(req, res) {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    if (planet) {
        res.status(200).json(planet);
    }
    else {
        res.status(404).json({ error: "Oh no. Il pianeta non esiste. :(" });
    }
}
exports.getOneById = getOneById;
function create(req, res) {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    planets = [...planets, newPlanet];
    res.status(201).json({
        message: `Il pianeta ${name} con id ${id} è stato creato con successo e inserito! :)`,
    });
}
exports.create = create;
function updateById(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? Object.assign(Object.assign({}, p), { name }) : p));
    res.status(200).json({ message: "Pianeta aggiornato!" });
}
exports.updateById = updateById;
function deleteById(req, res) {
    const { id } = req.params;
    planets = planets.filter((p) => p.id !== Number(id));
    res.status(200).json({ message: "Pianeta eliminato!" });
}
exports.deleteById = deleteById;
