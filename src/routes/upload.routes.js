import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { actualizarImagenCloudinary } from "../controllers/upload.controller.js";
import {
  handleValidationErrors,
  validarRolAdmin,
  validateImageFile,
} from "../middlewares/validator.js";
import { check } from "express-validator";

const router = Router();

router.put(
  "/:id",
  [
    authenticate,
    validarRolAdmin,

    //validar el tipo de archivo
    validateImageFile,
    check("id", "No es un id de mongo").isMongoId(),
    handleValidationErrors,
  ],
  actualizarImagenCloudinary,
);

export default router;
