import express from "express";
import morgan from "morgan";
//Librería para acceder a files
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import cookieParser from "cookie-parser";
//importar Cors
import cors from "cors";

const app = express();
//const PORT = process.env.PORT || 4500; //Esta en la manera de acceder a las variables de entorno y setearlas en una variable

//Middlewares
//usar Cors
app.use(
  cors({
    origin: "http://localhost:9500",
    credencials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json()); // explico a mi app que entienda el formato json (parsear)
app.use(express.urlencoded({ extended: true })); // explicarle a la app que pueda recibir info en formato json de un formulario
app.use(morgan("dev")); // capturo todos los logs de la app y muestra por consola
app.use(cookieParser()); // le explico a express que use cookie parser para poder acceder a las cookies
app.use(fileUpload()); //Para que la app pueda acceder desde el body a files
//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);

export default app;

//Conexión Base de datos
// await dbConnect();

// app.listen(PORT, () => console.log("🚀 Servidor en línea en puerto: " + PORT));
