import { request } from "./httpClient";

export const getCart = () => request("/cart");
export const addItemToCart = (payload) => request("/cart", "POST", payload);
export const updateCartItem = (productoId, payload) =>
  request(`/cart/${productoId}`, "PUT", payload);
export const deleteCartItem = (productoId) => request(`/cart/${productoId}`, "DELETE");
export const clearCart = () => request("/cart", "DELETE");
