import { request } from "./httpClient";

export const createPayment = (payload) => request("/payment", "POST", payload);
