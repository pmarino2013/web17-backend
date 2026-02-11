import mongoose from "mongoose";
import Producto from "../models/Product.js";

const { ObjectId } = mongoose.Types;

const buscarProductos = async (req, res = response) => {
  const { termino } = req.params;
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre",
    );

    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //busqueda insensible a mayusculas y minusculas

  const productos = await Producto.find({
    nombre: regex, //busca el termino en el campo nombre
    estado: true,
  }).populate("categoria", "nombre");

  const total = await Producto.countDocuments({
    nombre: regex,
    estado: true,
  });

  res.json({
    total,
    results: productos,
  });
};

export { buscarProductos };
