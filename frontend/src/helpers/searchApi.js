import { request } from "./httpClient";

export const searchProducts = (term) => request(`/search/${encodeURIComponent(term)}`);
