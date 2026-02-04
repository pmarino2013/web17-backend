import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarImagenCloudinary = async (req, res) => {
  try {
    if (!req.files || !req.files.archivo)
      return res.status(400).json({
        ok: false,
        message: "No hay archivos",
      });

    let file = req.files.archivo; // puede ser un objeto o un array
    // if (Array.isArray(file)) file = file[0];

    // express-fileupload expone el buffer en `file.data`
    //un bloque de datos binarios que contiene el contenido del archivo subido en memoria.
    if (!file.data) return res.status(400).send("Error en buffer");

    const dataUri = `data:${file.mimetype};base64,${file.data.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri);

    return res.json({
      ok: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, err: err.message || err });
  }
};

//----------------------------------------------------------------

const actualizarImagenCloudinary = async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await Product.findById(id);

    //valido que el producto exista con el id
    if (!producto) {
      return res.status(404).json({
        ok: false,
        message: `No existe un producto con el id ${id}`,
      });
    }

    //verifico que haya un archivo
    if (!req.files || !req.files.archivo)
      return res.status(400).json({
        ok: false,
        message: "No hay archivos",
      });

    //Guardo el archivo
    let file = req.files.archivo;

    //Verifico que tiene buffer
    if (!file.data) return res.status(400).send("Error en buffer");

    //Genero el archivo base64
    const dataUri = `data:${file.mimetype};base64,${file.data.toString("base64")}`;

    //Subo la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(dataUri);

    producto.img = result.secure_url;
    producto.save();

    res.status(200).json({
      ok: true,
      message: "Imagen actualizada",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export { actualizarImagenCloudinary, cargarImagenCloudinary };
