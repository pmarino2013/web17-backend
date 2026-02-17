const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4500/api";

const buildRequestConfig = (method, body, customHeaders) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    credentials: "include",
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  return config;
};

const parseResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Error inesperado en la API");
  }

  return data;
};

export const request = async (endpoint, method = "GET", body, headers = {}) => {
  const url = `${API_URL}${endpoint}`;
  const config = buildRequestConfig(method, body, headers);
  const response = await fetch(url, config);
  return parseResponse(response);
};

export const requestFormData = async (endpoint, formData, method = "PUT") => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    body: formData,
    credentials: "include",
  });

  return parseResponse(response);
};
