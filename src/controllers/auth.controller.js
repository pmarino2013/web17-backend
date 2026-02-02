import { sendVerificationEmail } from "../config/nodemailer.js";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

// El controlador para el registro
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //crear el usuario
    const user = new User({
      username,
      email,
      password,
    });

    // Generar el codigo de verificación
    const verificationCode = user.generateVerificationCode();

    // Guardar el usuario
    await user.save(); // aca se está guardando el usuario en mongo

    // enviamos el email de verificacion
    try {
      await sendVerificationEmail(email, username, verificationCode);
    } catch (error) {
      console.error("Error al enviar el email", error);
    }

    //envio la respuesta al cliente
    return res.status(201).json({
      ok: true,
      message: "Usuario creado correctamente",
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

// EL controlador para el Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    // chequear que la password coincida
    const isPasswordValid = user.comparePassword(password);
    // const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    //Chequear si tiene código verificado (por mi)
    if (!user.emailVerified) {
      return res.status(403).json({
        ok: false,
        message: "El email no está verificado",
      });
    }

    //generar el token
    const token = generateToken(user._id);

    //setear la cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hs
    };

    res.cookie("token", token, cookieOptions);

    //envio la respuesta al cliente
    return res.status(200).json({
      ok: true,
      message: "Login exitos!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

// El controlador para verificar el email (por mi)
const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    //buscar a ese usuario
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    //verificar que el código coincida
    if (user.verificationCode !== code) {
      return res.status(400).json({
        ok: false,
        message: "Código de verificación incorrecto",
      });
    }

    //verificar que el usuario no esté ya validado
    if (user.emailVerified) {
      return res.status(400).json({
        ok: false,
        message: "El usuario ya está verificado",
      });
    }

    //verificar que el código no haya expirado
    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({
        ok: false,
        message: "El código de verificación ya expiró",
      });
    }

    //Marcar el email como verificado y limpiar el código
    user.emailVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Email verificado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
// El controlador para hacer logout

// El controlador con el perfil del usuario
const getProfile = async (req, res) => {
  try {
    const { username, email, role, emailVerified } = req.user;
    res.json({
      success: true,
      data: {
        username,
        email,
        role,
        emailVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export { register, login, verifyEmail, getProfile };
