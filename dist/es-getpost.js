"use strict";
// Write simple Express server that listens on port 3000 (use dotenv to specify the port)
// Create a dummy "database" of planets using a let variable. (You will use this data in further exercises.)
// Configure your app (app.use()) to:
//      accept JSON from the Client
//      log the Client's requests
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
app.listen(PORT, () => {
    console.log(`Server funzionante su http://localhost:${PORT}`);
});
