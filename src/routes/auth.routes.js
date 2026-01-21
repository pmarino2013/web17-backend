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

//creado por mi
router.post("/verify-email", verifyEmailValidation(), verifyEmail);

//RUTAS PRIVADAS
//router.post('/logout') yo--------------------------------------------
router.post("/logout", (req, res) => {
  // Limpiamos la cookie llamada 'access_token'
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ ok: true, message: "Sesión cerrada exitosamente" });
});
//router.get('/profile') (yo)---------------------------------------------
router.get("/profile", authenticate, getProfile);

export default router;
