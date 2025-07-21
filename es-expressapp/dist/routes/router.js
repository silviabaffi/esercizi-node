"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_js_1 = require("../controllers/controller.js");
exports.router = express_1.default.Router();
exports.router.get("/", controller_js_1.getAll);
exports.router.get("/:id", controller_js_1.getOneById);
exports.router.post("/", controller_js_1.create);
exports.router.put("/:id", controller_js_1.updateById);
exports.router.delete("/:id", controller_js_1.deleteById);
