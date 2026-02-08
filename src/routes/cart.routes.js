import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
import { agregarItemCartValidation } from "../middlewares/validator.js";
// import {
//   handleValidationErrors,
//   validarCart,
//   validarIdProducto,
// } from "../middlewares/validator.js";
// import { check } from "express-validator";

const router = Router();

// Obtener carrito del usuario autenticado
router.get("/", authenticate, getCart);

// Agregar producto al carrito
router.post("/add", [authenticate], addToCart);

// Actualizar cantidad de un producto en el carrito
router.put("/:productoId", authenticate, updateCartItem);

// Eliminar un producto del carrito
router.delete("/:productoId", [authenticate], removeFromCart);

// Vaciar carrito completo
router.delete("/", authenticate, clearCart);

export default router;
