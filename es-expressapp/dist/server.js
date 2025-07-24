"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_js_1 = require("./routes/router.js");
const setupdb_js_1 = __importDefault(require("./setupdb.js"));
const routerUser_js_1 = require("./routes/routerUser.js");
require("./middlewares/authorize.js");
require("./passport.js");
dotenv_1.default.config();
(0, setupdb_js_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/planets", router_js_1.router);
app.use("/api/users", routerUser_js_1.router);
app.listen(PORT, () => {
    console.log(`Server funzionante su http://localhost:${PORT}`);
});
