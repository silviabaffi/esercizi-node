import express from "express";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "../controllers/controller.js";
import { upload } from "../storage.js";

export const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);
router.post("/:id/image", upload.single("image"), createImage);