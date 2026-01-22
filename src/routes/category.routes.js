import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarCategoria,
  crearCategoria,
  traerCategorias,
} from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { handleValidationErrors } from "../middlewares/validator.js";

const router = Router();

router.get("/", traerCategorias);
router.post(
  "/",

  [
    authenticate,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    handleValidationErrors,
  ],
  crearCategoria,
);
router.put(
  "/:id",
  [
    authenticate,
    check("id", "El id es requerido y debe ser válido").isMongoId(),
    handleValidationErrors,
  ],
  actualizarCategoria,
);
// router.delete("/:id");

export default router;
