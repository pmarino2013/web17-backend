import app from "./app.js";
import { dbConnect } from "./config/db.js";

const PORT = process.env.PORT || 4500;

await dbConnect();

app.listen(PORT, () => console.log("🚀 Servidor en línea en puerto: " + PORT));
