import { request } from "./httpClient";

export const registerUser = (payload) => request("/auth/register", "POST", payload);
export const loginUser = (payload) => request("/auth/login", "POST", payload);
export const verifyEmail = (payload) => request("/auth/verify-email", "POST", payload);
export const getProfile = () => request("/auth/profile");
export const logoutUser = () => request("/auth/logout", "POST");
