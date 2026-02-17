import { request } from "./httpClient";

export const getCategories = () => request("/category");
export const createCategory = (payload) => request("/category", "POST", payload);
