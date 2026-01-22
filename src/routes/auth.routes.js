import { Router } from "express";
import {
  getProfile,
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
  verifyEmailValidation,
} from "../middlewares/validator.js";
import { authenticate } from "../middlewares/auth.js";

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
router.post("/logout", authenticate, (req, res) => {
  //Chequear que exista el token de sesión

  //limpiar la cookie llamada token
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    ok: true,
    message: "Sesión cerrada exitosamente!",
  });

  //si no existe el token devolver un mensaje que diga que el usuario no está logueado
});
router.get("/profile", authenticate, getProfile);

export default router;
