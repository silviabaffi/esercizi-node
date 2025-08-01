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
const db_js_1 = __importDefault(require("./db.js"));
function setupDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_js_1.default.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );

        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
          id SERIAL NOT NULL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT
        )
    `);
        yield db_js_1.default.none("INSERT INTO planets (name) VALUES ('Earth'), ('Mars')");
        yield db_js_1.default.none("INSERT INTO users (username, password) VALUES ('Silvia', 'ciao123')");
        console.log("Setup DB completato");
    });
}
exports.default = setupDb;
