import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { router } from "./routes/router.js";
import setupDb from "./setupdb.js";
import { router as routerUser } from "./routes/routerUser.js";

dotenv.config();
setupDb();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/planets", router);
app.use("/api/users", routerUser);

app.listen(PORT, () => {
  console.log(`Server funzionante su http://localhost:${PORT}`);
});
