import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
import {
  handleValidationErrors,
  validarCart,
  validarIdProducto,
} from "../middlewares/validator.js";
import { check } from "express-validator";

const router = Router();

// Obtener carrito del usuario autenticado
router.get("/", authenticate, getCart);

// Agregar producto al carrito
router.post(
  "/add",
  [
    authenticate,
    // check("items.*.producto").isMongoId().withMessage("No es un id válido"),
    // check("items.*.cantidad", "la cantidad debe ser mayor que 0").isInt({
    //   min: 1,
    // }),
    // check("items.producto").custom(validarIdProducto),
    // handleValidationErrors,
  ],
  addToCart,
);

// Actualizar cantidad de un producto en el carrito
router.put("/:productoId", authenticate, updateCartItem);

// Eliminar un producto del carrito
router.delete("/:productoId", [authenticate], removeFromCart);

// Vaciar carrito completo
router.delete("/", authenticate, clearCart);

export default router;
