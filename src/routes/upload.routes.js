import { Router } from "express";
// import multer from "multer";

import { authenticate } from "../middlewares/auth.js";
import {
  actualizarImagenCloudinary,
  cargarImagenCloudinary,
} from "../controllers/upload.controller.js";
import { check } from "express-validator";
import { handleValidationErrors } from "../middlewares/validator.js";

const router = Router();
// const upload = multer();

router.post(
  "/",
  [authenticate],
  //   upload.single("archivo"),
  cargarImagenCloudinary,
);

router.put(
  "/:id",
  [
    authenticate,
    check("id", "Debe ser un id de Mongo").isMongoId(),
    handleValidationErrors,
  ],
  actualizarImagenCloudinary,
);

export default router;
