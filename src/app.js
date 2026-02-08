import express from "express";
//para acceder a los files de body
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
// import { dbConnect } from "./config/db.js";
//importar rutas
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import paymentRoutes from "./routes/payment.routes.js";

const app = express();

//const PORT = process.env.PORT || 4500; //Esta en la manera de acceder a las variables de entorno y setearlas en una variable

//Middlewares
app.use(
  cors({
    origin: "http://localhost:9500",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.static("public")); //le digo a express que la carpeta public es estatica y de ahi va a servir los archivos
app.use(express.json()); // explico a mi app que entienda el formato json (parsear)
app.use(express.urlencoded({ extended: true })); // explicarle a la app que pueda recibir info en formato json de un formulario
app.use(morgan("dev")); // capturo todos los logs de la app y muestra por consola
app.use(cookieParser()); // le explico a express que use cookie parser para poder acceder a las cookies

app.use(fileUpload()); // Para que la app pueda manejar la request del cliente cuando envíe archivos

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

//agrego ruta para subir archivo
app.use("/api/upload", uploadRoutes);

//Ruta payment
app.use("/api/payment", paymentRoutes);

//Conexión Base de datos
// await dbConnect();

// app.listen(PORT, () => console.log("🚀 Servidor en línea en puerto: " + PORT));
export default app;
