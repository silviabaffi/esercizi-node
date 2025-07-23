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
exports.logIn = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield db_js_1.default.one("SELECT * FROM users WHERE username = $1", username);
        if (user && user.password === password) {
            const payload = {
                id: user.id,
                username,
            };
            const { SECRET = "" } = process.env;
            const token = jsonwebtoken_1.default.sign(payload, SECRET);
            yield db_js_1.default.none("UPDATE users SET token = $2 WHERE id = $1", [
                user.id,
                token,
            ]);
            res.status(200).json({ id: user.id, username, token });
        }
        else {
            res.status(400).json({ message: "Username o password non validi." });
        }
    });
}
exports.logIn = logIn;
