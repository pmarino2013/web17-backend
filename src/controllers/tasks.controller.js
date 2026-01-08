import Task from "../models/task.js";

const getTask = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json({
        tasks,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las tareas",
      });
    }
  }

  const createOneTask = async (req,res) => {    
    try {
        //1- necesito capturar la info de la tarea       
       const {title, description} = req.body; 
       
       //2-  Crear la tarea en mongo
       const newTask = await Task.create({title, description});

      //3- Enviar respuesta al cliente
       return res.status(201).json({
        ok: true, 
        message: "Tarea creada correctamente ✔",
        data: {
            newTask
        }
       })                 
        } catch (error) {             
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: error.message
            })
        }
  }

  const updateOneTask = async (req,res) => {
        try {
            // 1 - Capturar el id de la tarea a actualizar
            const {id} = req.params; 

            // 2 -  Capturar la info
            const {title, description, completed} = req.body; 

            // 3 - Actualizar la tarea
            const updatedTask = await Task.findByIdAndUpdate(
                id,
                {
                 title, description, completed   
                },
                {new:true}
            )

            // 4 - Armar la respuesta para el cliente
            return res.status(200).json({
                ok: true,
                message: "Tarea actualizada correctamente ✔",
                data: updatedTask
            })

            
        } catch (error) {
            console.log(error);            
            return res.status(500).json({
                ok: false,
                message: error.message
            })
        }
  }

  const deleteOneTask = async (req,res) => {
      try {

        // 1- capturar el id de la tarea
        const {id} = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        return res.status(200).json({
          ok:true,
          message: "Tarea eliminada correctamente",
          data: deletedTask
        })

      } catch (error) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          message: error.message
        })
      }
  }

 export {getTask, createOneTask, updateOneTask, deleteOneTask};