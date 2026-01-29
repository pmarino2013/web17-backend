import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { agregarItem } from "../controllers/cart.controller.js";

const router = Router();

router.post("/", authenticate, agregarItem);

export default router;
