import Producto from "../models/Product.js";

//Get para traer todos los productos paginados--------------------
const obtenerProductos = async (req = request, res = response) => {
  // paginación y total de productos
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde)) //desde donde quiero empezar a mostrar los productos
      .limit(Number(limite)) //cuantos productos quiero mostrar
      .populate("categoria", "nombre")
      .populate("usuario", "username"),
    //Como traigo los datos de los usuarios y las categorias?🤔
  ]);

  res.json({
    total,
    productos,
  });
};

//obtener un producto por su ID
const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");
  //Como traigo los datos de los usuarios y las categorias?🤔

  res.json({
    producto,
  });
};

//Crear Producto--------------------------------------
const crearProducto = async (req, res = response) => {
  const { precio, categoria, descripcion } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    usuario: req.user._id,
  };

  const producto = new Producto(data);

  //grabar en la base de datos
  await producto.save();

  res.status(201).json(producto);
};

//actualizarProducto (validar nombre)-----------------------------------------

const actualizarProducto = async (req, res) => {
  const { id } = req.params;

  const { precio, categoria, descripcion, disponible } = req.body;

  const usuario = req.user._id;
  let data = {
    precio,
    descripcion,
    categoria,
    disponible,
    usuario,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json(producto);
};

//Borrar producto-----------------------------------------------------
const borrarProducto = async (req, res) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
  );

  res.json({
    productoBorrado,
  });
};

export { obtenerProductos, crearProducto, actualizarProducto, borrarProducto };
