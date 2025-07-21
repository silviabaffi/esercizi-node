"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const db_js_1 = __importDefault(require("../db.js"));
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
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const planets = yield db_js_1.default.many("SELECT * FROM planets");
        res.status(200).json(planets);
    });
}
exports.getAll = getAll;
function getOneById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const planet = yield db_js_1.default.oneOrNone("SELECT * FROM planets WHERE id = $1", [
            id,
        ]);
        // const planet = planets.find((p) => p.id === Number(id));
        if (planet) {
            res.status(200).json(planet);
        }
        else {
            res.status(404).json({ error: "Oh no. Il pianeta non esiste. :(" });
        }
    });
}
exports.getOneById = getOneById;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name } = req.body;
        yield db_js_1.default.none("INSERT INTO planets (name) VALUES ($1)", [name]);
        // const newPlanet = { id, name };
        // planets = [...planets, newPlanet];
        res.status(201).json({
            message: `Il pianeta ${name} con id ${id} è stato creato con successo e inserito! :)`,
        });
    });
}
exports.create = create;
function updateById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name } = req.body;
        const result = yield db_js_1.default.result("UPDATE planets SET name = $2 WHERE id = $1", [
            id,
            name,
        ]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Pianeta non trovato. :(" });
        }
        // planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
        res.status(200).json({ message: "Pianeta aggiornato!" });
    });
}
exports.updateById = updateById;
function deleteById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield db_js_1.default.result("DELETE FROM planets WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(400).json({ message: "Pianeta non trovato. :(" });
        }
        // planets = planets.filter((p) => p.id !== Number(id));
        res.status(200).json({ message: "Pianeta eliminato!" });
    });
}
exports.deleteById = deleteById;
