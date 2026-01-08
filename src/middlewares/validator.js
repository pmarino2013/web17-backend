import {check, validationResult} from "express-validator";
import Task from "../models/task.js";

//armar una función que maneje el resultado de las validaciones
const handleValidationErrors = (req, res, next) => {
        // Voy a preguntarme si NO hay errores

        const errors = validationResult(req);
         if(!errors.isEmpty()){
             // Si hay errores los mando en la respuesta al cliente
             return res.status(400).json({
                ok:false,
                errors: errors.mapped()
             })   
         }
        // Si no hay errores entonces indico que el flujo continue al controlador        
        next()
}

//Validación para crear una tarea
const validateCreateTask = [
    check("title")
    .notEmpty().withMessage("El titulo es obligatorio")
    .isString().withMessage("El campo tiene que ser un string")
    .isLength({min: 5, max:50}).withMessage('El título debe tener entre 5 y 50 caracteres'),

    check("description")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({min: 5, max:500}).withMessage('La descripción debe tener entre 5 y 500 caracteres'),     
    handleValidationErrors
]

const validateTaskById = async (value) => {
    const taskById = await Task.findById(value);
    if(!taskById){
        throw new Error('La tarea no existe')
    }
}

const validateUpdateTask = [
    check("id")
    .isMongoId().withMessage("Envia un id válido")
    .custom(validateTaskById),
    handleValidationErrors
]

const validateDeleteTask = [
    check("id")
    .isMongoId().withMessage("Envia un id válido")
    .custom(validateTaskById),
    handleValidationErrors
]



export {
    validateCreateTask,
    validateUpdateTask,
    validateDeleteTask,
    handleValidationErrors    
}