import { Router } from "express";
import { buscarProductos } from "../controllers/search.controller.js";
import { check } from "express-validator";
import { handleValidationErrors } from "../middlewares/validator.js";

const router = Router();
router.get(
  "/:termino",
  check("termino", "No puede estar vacío").notEmpty(),
  handleValidationErrors,

  buscarProductos,
);
export default router;
