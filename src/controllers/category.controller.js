import Categoria from "../models/Category.js";

const traerCategorias = async (req, res) => {
  const categorias = await Categoria.find({ estado: true }).populate(
    "usuario",
    "username email role",
  );
  const total = await Categoria.countDocuments({ estado: true });

  res.json({
    total,
    categorias,
  });
};

const crearCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  const validarNombre = await Categoria.findOne({ nombre });

  if (validarNombre) {
    return res.status(400).json({
      ok: false,
      message: `La categoría ${nombre} ya existe`,
    });
  }

  const usuario = req.user._id;

  const categoria = new Categoria({ nombre, usuario });

  categoria.save();

  res.status(201).json({
    message: "Categoría guardada",
    categoria,
  });
};

const actualizarCategoria = async (req, res) => {
  const { id } = req.params;

  const { nombre } = req.body;

  //validar nombre
  //validar que el id exista en la BD

  const datos = {
    nombre: nombre.toUpperCase(),
    usuario: req.user._id,
  };

  const categoria = await Categoria.findByIdAndUpdate(id, datos, { new: true });

  res.status(200).json({
    message: "Categoría actualizada",
    categoria,
  });
};

export { traerCategorias, crearCategoria, actualizarCategoria };
