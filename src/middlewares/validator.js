import {check, validationResult} from "express-validator";


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

//Funciones de validación

// 1 - Validación de registro


// 2 - Validación de Login


// 3 - Validación del código de verificación


export {
    
    handleValidationErrors    
}