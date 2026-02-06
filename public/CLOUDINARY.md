# Clase: Actualización — Subida de imágenes con Cloudinary

**Objetivos:**

- **Entender** qué dependencias se agregaron.
- **Ver** cómo se configura el middleware para recibir archivos.
- **Examinar** el controlador que sube imágenes a Cloudinary.
- **Probar** las rutas para subir y actualizar imágenes.

**Resumen**

Mensaje: Actualizo imagen de productos con controlador y rutas upload

**Archivos**

- **package.json**: [package.json](package.json) (dependencias actualizadas)
- **package-lock.json**: [package-lock.json](package-lock.json)
- **src/app.js**: [src/app.js](src/app.js) (se registró middleware y ruta /api/upload)
- **src/controllers/upload.controller.js**: [src/controllers/upload.controller.js](src/controllers/upload.controller.js) (nuevo controlador)
- **src/routes/upload.routes.js**: [src/routes/upload.routes.js](src/routes/upload.routes.js) (nuevas rutas)

**Paso a paso (sencillo)**

### 1. Dependencias agregadas

Se añadieron (entre otras) las dependencias necesarias para manejar archivos y Cloudinary:

```json
"cloudinary": "^2.9.0",
"express-fileupload": "^1.5.2",
```

### 2. Configurar la app para recibir archivos (`src/app.js`)

Se importó y activó `express-fileupload`, y se montó la nueva ruta de upload:

```javascript
import fileUpload from "express-fileupload";
import uploadRoutes from "./routes/upload.routes.js";

app.use(fileUpload()); // permite recibir archivos en req.files

// ... otras rutas
app.use("/api/upload", uploadRoutes);
```

### 3. Controlador para subir a Cloudinary (`src/controllers/upload.controller.js`)

Ejemplo simplificado del método principal que sube una imagen y devuelve la URL:

```javascript
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarImagenCloudinary = async (req, res) => {
  try {
    if (!req.files || !req.files.archivo)
      return res.status(400).json({ ok: false, message: "No hay archivos" });

    const file = req.files.archivo;
    if (!file.data) return res.status(400).send("Error en buffer");

    const dataUri = `data:${file.mimetype};base64,${file.data.toString("base64")}`;
    const result = await cloudinary.uploader.upload(dataUri);

    return res.json({
      ok: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, err: err.message || err });
  }
};
```

También se incluye una función para actualizar la imagen de un `Product` (busca por id, sube la imagen y guarda la URL en el documento).

### 4. Rutas de upload (`src/routes/upload.routes.js`)

Rutas principales añadidas:

```javascript
import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  cargarImagenCloudinary,
  actualizarImagenCloudinary,
} from "../controllers/upload.controller.js";
import {
  validateImageFile,
  handleValidationErrors,
} from "../middlewares/validator.js";

const router = Router();

router.post("/", [authenticate], cargarImagenCloudinary);

router.put(
  "/:id",
  [
    authenticate,
    validateImageFile,
    check("id", "Debe ser un id de Mongo").isMongoId(),
    handleValidationErrors,
  ],
  actualizarImagenCloudinary,
);

export default router;
```
