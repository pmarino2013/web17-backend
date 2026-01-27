import { Router } from "express";
import { check } from "express-validator";
import { authenticate } from "../middlewares/auth.js";
import {
  crearProducto,
  obtenerProductos,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", obtenerProductos);

router.post("/", authenticate, crearProducto);

export default router;
