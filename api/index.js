import { dbConnect } from "../src/config/db.js";
import app from "../src/app.js";

// Conectar a la base de datos
await dbConnect();

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log("🚀 Servidor en línea en puerto: " + PORT));
