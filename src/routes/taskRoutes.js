import { Router } from "express";
import { createOneTask, deleteOneTask, getTask, updateOneTask } from "../controllers/tasks.controller.js";
import { validateCreateTask, validateDeleteTask, validateUpdateTask } from "../middlewares/validator.js";


const router = Router();

router.get("/", getTask);
router.post("/createTask", validateCreateTask, createOneTask);
router.put("/updateTask/:id", validateUpdateTask, updateOneTask); // ruta parametrizada
router.delete("/deleteTask/:id", validateDeleteTask, deleteOneTask); // ruta parametrizada

export default router;
