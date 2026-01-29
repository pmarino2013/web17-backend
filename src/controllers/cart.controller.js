import Cart from "../models/Cart.js";
import Producto from "../models/Product.js";

//Obtener Carrito del usuario

// Agregar item al carrito
const agregarItem = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    //si en la request vienen los datos
    if (!productoId || !cantidad) {
      return res.status(400).json({
        ok: false,
        error: "Debe proporcionar productoId y cantidad",
      });
    }

    //cantidad es mayor que 0
    if (cantidad < 1) {
      return res.status(400).json({
        ok: false,
        message: "La cantidad debe ser mayor que 0",
      });
    }

    //validar el producto-------------------
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.satus(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }
    if (!producto.disponible) {
      return res.satus(400).json({
        ok: false,
        message: "Producto no disponible",
      });
    }
    //------------------------------------------

    let cart = await Cart.findOne({ usuario: req.user._id });

    //si carrito no existe lo creo
    if (!cart) {
      cart = new Cart({ usuario: req.user._id, items: [] });
    }

    //si el carrito existe buscamos el id del producto en los items
    const itemExiste = cart.items.find(
      (item) => item.producto.toString() === productoId,
    );

    //si encontramos el item en el carrito
    if (itemExiste) {
      itemExiste.cantidad += cantidad;
    } else {
      console.log(cart.items);
      cart.items.push({
        producto: productoId,
        cantidad,
        precioUnitario: producto.precio,
      });
    }

    cart.calcularTotal();
    await cart.save();

    // const cartPopulate = await cart.populate("items.producto");

    res.json({
      message: "ok",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar item del carrito

//actualizar cantidad

//Vaciar el carrito

export { agregarItem };
