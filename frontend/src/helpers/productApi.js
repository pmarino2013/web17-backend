import { request } from "./httpClient";

export const getProducts = (query = "") => request(`/product${query}`);
export const createProduct = (payload) => request("/product", "POST", payload);
