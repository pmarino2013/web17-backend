import { requestFormData } from "./httpClient";

export const uploadProductImage = (productId, file) => {
  const formData = new FormData();
  formData.append("archivo", file);

  return requestFormData(`/upload/${productId}`, formData);
};
