import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import {getAll, getOneById, create, updateById, deleteById} from "./controllers/controller.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets/", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.listen(PORT, () => {
  console.log(`Server funzionante su http://localhost:${PORT}`);
});
