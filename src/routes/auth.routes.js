import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
  verifyEmailValidation,
} from "../middlewares/validator.js";

const router = Router();

// Llega con /auth
router.get("/prueba", (req, res) => {
  res.send("Aplicación funcionando");
});

//RUTAS PUBLICAS
router.post("/register", registerValidation(), register);
router.post("/login", loginValidation(), login);
router.post("/verify-email", verifyEmailValidation(), verifyEmail);

//RUTAS PRIVADAS
//router.post('/logout')->por mi
//router.get('/profile')

export default router;
