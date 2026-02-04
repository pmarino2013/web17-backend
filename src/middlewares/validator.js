import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import Categoria from "../models/Category.js";
import Producto from "../models/Product.js";
import Cart from "../models/Cart.js";

//armar una función que maneje el resultado de las validaciones
const handleValidationErrors = (req, res, next) => {
  // Voy a preguntarme si NO hay errores

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores los mando en la respuesta al cliente
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // Si no hay errores entonces indico que el flujo continue al controlador
  next();
};

//Funciones de validación

// 1 - Validación de registro
const registerValidation = () => [
  check("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .custom(async (value) => {
      const user = await User.findOne({ value });
      if (user && user.username === value) {
        throw new Error("El usuario ya existe");
      }
    }),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (value) => {
      const user = await User.findOne({ value });
      if (user) {
        throw new Error("El usuario ya existe");
      }
    })
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  handleValidationErrors,
];

// 2 - Validación de Login
const loginValidation = () => [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// 3 - Validación del código de verificación
const verifyEmailValidation = () => [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user && user.emailVerified) {
        throw new Error("El usuario ya está verificado");
      }
    })
    .normalizeEmail(),
  check("code")
    .notEmpty()
    .withMessage("Verification code is required")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("Verification code must be 6 digits")
    .isNumeric()
    .withMessage("Verification code must be numeric"),
  handleValidationErrors,
];

//CATEGORÍA validar id
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id ${id} NO existe`);
  }
  //Si la Categoria existe verifico su estado
  if (!existeCategoria.estado) {
    throw new Error(`La Categoria ${existeCategoria.nombre} está inactiva`);
  }
};

//Validar rol admin
const validarRol = (req, res, next) => {
  const rol = req.user.role;
  console.log(rol);
  if (rol !== "admin") {
    return res.status(401).json({
      ok: false,
      message: "No tiene permisos para realizar la acción",
    });
  }
  next();
};

//validar producto por id
const validarIdProducto = async (id) => {
  const producto = await Producto.findById(id);
  if (producto) {
    throw new Error("Producto ya existe");
  }
};

//función especial
const validarProductoParaCarrito = async (productoId) => {
  const producto = await Producto.findById(productoId);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (!producto.disponible) {
    return res.status(400).json({ error: "Producto no disponible" });
  }
};

//Carrito

const validarCart = async (req, res, next) => {
  console.log(req.user);
  let cart = await Cart.findOne({ usuario: req.user.id });
  //si carrito no existe
  if (!cart) {
    return res
      .status(400)
      .json({ ok: false, message: "Carrito no encontrado" });
  } else {
    req.cart = cart;
  }
  next();
};

// Middleware para validar que el archivo sea una imagen
const validateImageFile = (req, res, next) => {
  if (!req.files || !req.files.archivo) {
    return res.status(400).json({ ok: false, message: "No file uploaded" });
  }

  // let file = Array.isArray(req.files.archivo) ? req.files.archivo[0] : req.files.archivo;

  let file = req.files.archivo;

  const formatosValidos = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (!formatosValidos.includes(file.mimetype)) {
    return res.status(400).json({
      ok: false,
      message: "Solo se permiten imágenes (JPG, PNG, GIF, WebP)",
    });
  }

  next();
};

export {
  registerValidation,
  loginValidation,
  verifyEmailValidation,
  handleValidationErrors,
  existeCategoriaPorId,
  validarRol,
  validarIdProducto,
  validarCart,
  validateImageFile,
};
