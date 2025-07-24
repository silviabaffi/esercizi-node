"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const authorize_js_1 = __importDefault(require("../middlewares/authorize.js"));
exports.router = express_1.default.Router();
exports.router.post("/login", users_1.logIn);
exports.router.get("/logout", authorize_js_1.default, users_1.logOut);
exports.router.post("/signup", users_1.signUp);
