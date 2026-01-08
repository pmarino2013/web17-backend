import express from "express";
import morgan from "morgan";
import { dbConnect } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
const app = express();
const PORT = process.env.PORT || 4500; //Esta en la manera de acceder a las variables de entorno y setearlas en una variable


//Middlewares
app.use(express.json()); // explico a mi app que entienda el formato json (parsear)
app.use(express.urlencoded({extended:true})) // explicarle a la app que pueda recibir info en formato json de un formulario
app.use(morgan('dev')); // capturo todos los logs de la app y muestra por consola

//Rutas
app.use("/api/tasks", taskRoutes);


//Conexión Base de datos
await dbConnect();

app.listen(PORT, () => console.log("🚀 Servidor en línea en puerto: " + PORT));
