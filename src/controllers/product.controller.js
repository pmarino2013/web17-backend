import Producto from "../models/Product.js";

//obtener la lista de productos
const obtenerProductos = async (req, res) => {
  //   const productos = await Producto.find({ estado: true })
  //     .populate("usuario", "username email role")
  //     .populate("categoria", "nombre");

  //   const total = await Producto.countDocuments({ estado: true });

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .populate("usuario", "username email role")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    productos,
  });
};

//crear un producto
const crearProducto = async (req, res) => {
  const { precio, categoria, descripcion, img } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  //validar si ya existe un producto con ese nombre
  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      message: `El producto con el nombre ${productoDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    usuario: req.user._id,
  };

  const producto = new Producto(data);

  await producto.save();

  res.status(201).json({
    ok: true,
    message: `El producto ${data.nombre} se guardó con éxito!!`,
  });
};
//actualizar un producto

//Borrar un producto

export { crearProducto, obtenerProductos };
