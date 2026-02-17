import { useEffect, useMemo, useState } from "react";
import SectionCard from "./components/SectionCard";
import StatusMessage from "./components/StatusMessage";
import ProductTable from "./components/ProductTable";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from "./helpers/authApi";
import { createCategory, getCategories } from "./helpers/categoryApi";
import { createProduct, getProducts } from "./helpers/productApi";
import {
  addItemToCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "./helpers/cartApi";
import { searchProducts } from "./helpers/searchApi";
import { uploadProductImage } from "./helpers/uploadApi";
import { createPayment } from "./helpers/paymentApi";

const initialMessage = { type: "info", text: "" };

const App = () => {
  const [message, setMessage] = useState(initialMessage);
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [verifyForm, setVerifyForm] = useState({ email: "", code: "" });
  const [categoryName, setCategoryName] = useState("");
  const [productForm, setProductForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
  });
  const [cartForm, setCartForm] = useState({ productoId: "", cantidad: 1 });
  const [updateCartForm, setUpdateCartForm] = useState({ productoId: "", cantidad: 1 });
  const [uploadForm, setUploadForm] = useState({ productId: "", file: null });

  const isAdmin = useMemo(() => profile?.role === "ADMIN", [profile]);

  const showMessage = (type, text) => setMessage({ type, text });

  const loadBootstrapData = async () => {
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        getCategories(),
        getProducts("?limite=20&desde=0"),
      ]);

      setCategories(categoriesResponse.categorias || []);
      setProducts(productsResponse.productos || []);
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  useEffect(() => {
    loadBootstrapData();
  }, []);

  const handleAsyncAction = async (cb, successMessage) => {
    try {
      await cb();
      if (successMessage) {
        showMessage("success", successMessage);
      }
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  const handleProfile = () =>
    handleAsyncAction(async () => {
      const response = await getProfile();
      setProfile(response.data);
    }, "Perfil cargado");

  const handleRegister = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await registerUser(registerForm);
      setRegisterForm({ username: "", email: "", password: "" });
    }, "Usuario registrado. Revisa tu email para verificar la cuenta.");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await loginUser(loginForm);
      setLoginForm({ email: "", password: "" });
    }, "Login correcto.");
  };

  const handleVerify = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await verifyEmail(verifyForm);
      setVerifyForm({ email: "", code: "" });
    }, "Email verificado.");
  };

  const handleLogout = () =>
    handleAsyncAction(async () => {
      await logoutUser();
      setProfile(null);
    }, "Sesión cerrada.");

  const handleCreateCategory = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await createCategory({ nombre: categoryName });
      setCategoryName("");
      await loadBootstrapData();
    }, "Categoría creada.");
  };

  const handleCreateProduct = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await createProduct({
        ...productForm,
        precio: Number(productForm.precio),
      });
      setProductForm({ nombre: "", categoria: "", precio: "", descripcion: "" });
      await loadBootstrapData();
    }, "Producto creado.");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      const response = await searchProducts(searchTerm);
      setSearchResults(response.results || []);
    });
  };

  const handleGetCart = () =>
    handleAsyncAction(async () => {
      const response = await getCart();
      setCart(response || { items: [], total: 0 });
    }, "Carrito actualizado.");

  const handleAddToCart = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await addItemToCart({ productoId: cartForm.productoId, cantidad: Number(cartForm.cantidad) });
      await handleGetCart();
    }, "Item agregado al carrito.");
  };

  const handleUpdateCart = (event) => {
    event.preventDefault();
    handleAsyncAction(async () => {
      await updateCartItem(updateCartForm.productoId, {
        cantidad: Number(updateCartForm.cantidad),
      });
      await handleGetCart();
    }, "Cantidad actualizada.");
  };

  const handleDeleteCartItem = (productoId) =>
    handleAsyncAction(async () => {
      await deleteCartItem(productoId);
      await handleGetCart();
    }, "Item removido.");

  const handleClearCart = () =>
    handleAsyncAction(async () => {
      await clearCart();
      await handleGetCart();
    }, "Carrito eliminado.");

  const handleUploadImage = (event) => {
    event.preventDefault();
    if (!uploadForm.file) {
      showMessage("error", "Debes seleccionar un archivo.");
      return;
    }

    handleAsyncAction(async () => {
      await uploadProductImage(uploadForm.productId, uploadForm.file);
      setUploadForm({ productId: "", file: null });
    }, "Imagen subida correctamente.");
  };

  const handleCreatePayment = () =>
    handleAsyncAction(async () => {
      const paymentResponse = await createPayment({
        titulo: "Compra Web17",
        cantidad: 1,
        precio: cart.total || 1,
      });
      showMessage("success", `Preferencia creada: ${paymentResponse.id}`);
    });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-3xl font-extrabold text-cyan-300">Frontend Web17</h1>
          <p className="mt-2 text-slate-300">
            Cliente React + Tailwind conectado al backend con Fetch API y estructura de helpers.
          </p>
          <div className="mt-4">
            <StatusMessage type={message.type} text={message.text} />
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Autenticación" description="Registro, login, verificación y perfil.">
            <div className="grid gap-3">
              <form className="grid gap-2" onSubmit={handleRegister}>
                <input className="rounded bg-slate-800 p-2" placeholder="Username" value={registerForm.username} onChange={(e) => setRegisterForm((s) => ({ ...s, username: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" placeholder="Email" value={registerForm.email} onChange={(e) => setRegisterForm((s) => ({ ...s, email: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" placeholder="Password" type="password" value={registerForm.password} onChange={(e) => setRegisterForm((s) => ({ ...s, password: e.target.value }))} />
                <button className="rounded bg-cyan-600 px-3 py-2 font-semibold">Registrar</button>
              </form>

              <form className="grid gap-2" onSubmit={handleLogin}>
                <input className="rounded bg-slate-800 p-2" placeholder="Email" value={loginForm.email} onChange={(e) => setLoginForm((s) => ({ ...s, email: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" placeholder="Password" type="password" value={loginForm.password} onChange={(e) => setLoginForm((s) => ({ ...s, password: e.target.value }))} />
                <button className="rounded bg-emerald-600 px-3 py-2 font-semibold">Iniciar sesión</button>
              </form>

              <form className="grid gap-2" onSubmit={handleVerify}>
                <input className="rounded bg-slate-800 p-2" placeholder="Email" value={verifyForm.email} onChange={(e) => setVerifyForm((s) => ({ ...s, email: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" placeholder="Código de verificación" value={verifyForm.code} onChange={(e) => setVerifyForm((s) => ({ ...s, code: e.target.value }))} />
                <button className="rounded bg-indigo-600 px-3 py-2 font-semibold">Verificar email</button>
              </form>

              <div className="flex gap-2">
                <button className="rounded bg-slate-700 px-3 py-2" onClick={handleProfile}>Ver perfil</button>
                <button className="rounded bg-rose-600 px-3 py-2" onClick={handleLogout}>Logout</button>
              </div>
              {profile && <pre className="rounded bg-slate-800 p-3 text-xs">{JSON.stringify(profile, null, 2)}</pre>}
            </div>
          </SectionCard>

          <SectionCard title="Categorías y Productos" description="Gestión principal del catálogo.">
            <div className="grid gap-3">
              <p className="text-sm text-slate-400">Rol actual: {profile?.role || "Sin sesión"} {isAdmin ? "(admin)" : ""}</p>
              <form onSubmit={handleCreateCategory} className="flex gap-2">
                <input className="w-full rounded bg-slate-800 p-2" placeholder="Nueva categoría" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <button className="rounded bg-cyan-700 px-3 py-2">Crear</button>
              </form>
              <form className="grid gap-2" onSubmit={handleCreateProduct}>
                <input className="rounded bg-slate-800 p-2" placeholder="Nombre" value={productForm.nombre} onChange={(e) => setProductForm((s) => ({ ...s, nombre: e.target.value }))} />
                <select className="rounded bg-slate-800 p-2" value={productForm.categoria} onChange={(e) => setProductForm((s) => ({ ...s, categoria: e.target.value }))}>
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => <option key={category._id} value={category._id}>{category.nombre}</option>)}
                </select>
                <input className="rounded bg-slate-800 p-2" placeholder="Precio" type="number" value={productForm.precio} onChange={(e) => setProductForm((s) => ({ ...s, precio: e.target.value }))} />
                <textarea className="rounded bg-slate-800 p-2" placeholder="Descripción" value={productForm.descripcion} onChange={(e) => setProductForm((s) => ({ ...s, descripcion: e.target.value }))} />
                <button className="rounded bg-emerald-700 px-3 py-2">Crear producto</button>
              </form>
              <ProductTable products={products} />
            </div>
          </SectionCard>

          <SectionCard title="Búsqueda" description="Consulta productos por término o ID.">
            <form className="flex gap-2" onSubmit={handleSearch}>
              <input className="w-full rounded bg-slate-800 p-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar producto" />
              <button className="rounded bg-indigo-700 px-3 py-2">Buscar</button>
            </form>
            <div className="mt-3">
              <ProductTable products={searchResults} />
            </div>
          </SectionCard>

          <SectionCard title="Carrito, Upload y Pago" description="Operaciones autenticadas del cliente.">
            <div className="grid gap-3">
              <div className="flex gap-2">
                <button className="rounded bg-slate-700 px-3 py-2" onClick={handleGetCart}>Traer carrito</button>
                <button className="rounded bg-rose-700 px-3 py-2" onClick={handleClearCart}>Vaciar carrito</button>
              </div>

              <form className="grid gap-2" onSubmit={handleAddToCart}>
                <input className="rounded bg-slate-800 p-2" placeholder="ID producto" value={cartForm.productoId} onChange={(e) => setCartForm((s) => ({ ...s, productoId: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" placeholder="Cantidad" type="number" min="1" value={cartForm.cantidad} onChange={(e) => setCartForm((s) => ({ ...s, cantidad: e.target.value }))} />
                <button className="rounded bg-cyan-700 px-3 py-2">Agregar al carrito</button>
              </form>

              <form className="grid gap-2" onSubmit={handleUpdateCart}>
                <input className="rounded bg-slate-800 p-2" placeholder="ID producto" value={updateCartForm.productoId} onChange={(e) => setUpdateCartForm((s) => ({ ...s, productoId: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" placeholder="Cantidad nueva" type="number" min="1" value={updateCartForm.cantidad} onChange={(e) => setUpdateCartForm((s) => ({ ...s, cantidad: e.target.value }))} />
                <button className="rounded bg-indigo-700 px-3 py-2">Actualizar cantidad</button>
              </form>

              <form className="grid gap-2" onSubmit={handleUploadImage}>
                <input className="rounded bg-slate-800 p-2" placeholder="ID producto" value={uploadForm.productId} onChange={(e) => setUploadForm((s) => ({ ...s, productId: e.target.value }))} />
                <input className="rounded bg-slate-800 p-2" type="file" onChange={(e) => setUploadForm((s) => ({ ...s, file: e.target.files?.[0] || null }))} />
                <button className="rounded bg-amber-700 px-3 py-2">Subir imagen</button>
              </form>

              <button className="rounded bg-emerald-700 px-3 py-2 font-semibold" onClick={handleCreatePayment}>Crear pago con total del carrito</button>

              <div className="rounded bg-slate-800 p-3 text-sm">
                <p>Total: ${cart.total || 0}</p>
                <ul className="mt-2 grid gap-1">
                  {cart.items?.map((item) => (
                    <li className="flex items-center justify-between" key={item.producto?._id || item.producto}>
                      <span>
                        {item.producto?.nombre || item.producto} x {item.cantidad}
                      </span>
                      <button className="rounded bg-rose-800 px-2 py-1 text-xs" onClick={() => handleDeleteCartItem(item.producto?._id || item.producto)}>Quitar</button>
                    </li>
                  ))}
                  {!cart.items?.length && <li className="text-slate-400">Sin items.</li>}
                </ul>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
};

export default App;
