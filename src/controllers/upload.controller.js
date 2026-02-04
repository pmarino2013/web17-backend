import { v2 as cloudinary } from "cloudinary";
import Producto from "../models/Product.js";

cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImagenCloudinary = async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await Producto.findById(id);

    //validamos que el producto exista
    if (!producto) {
      return res.status(404).json({
        ok: false,
        message: `No existe un producto con el id ${id}`,
      });
    }

    //verificar que haya un archivo
    // if (!req.files || !req.files.archivo) {
    //   return res.status(400).json({
    //     ok: false,
    //     message: "No hay archivo",
    //   });
    // }

    //guardo la request del archivo
    let file = req.files.archivo;

    //verificar que tenga buffer
    if (!file.data) {
      return res.status(400).json({
        ok: false,
        message: "Error en buffer",
      });
    }

    //Genero el archivo base64
    const dataUri = `data:${file.mimetype};base64,${file.data.toString("base64")}`;

    //subir imagen y gauardar la respuesta
    const result = await cloudinary.uploader.upload(dataUri);

    producto.img = result.secure_url;
    producto.save();

    res.status(200).json({
      ok: true,
      message: "Imagen actualizada",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export { actualizarImagenCloudinary };
