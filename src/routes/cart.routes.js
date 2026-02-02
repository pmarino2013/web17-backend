import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  actualizarCantidad,
  agregarItem,
  borrarCarrito,
  borrarItem,
  traerItems,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authenticate, traerItems);
router.post("/", authenticate, agregarItem);
router.put("/:productoId", authenticate, actualizarCantidad);
router.delete("/:productoId", authenticate, borrarItem);
router.delete("/", authenticate, borrarCarrito);

export default router;
