import { useApi } from "./api";

export function CategoriesAPI() {
  const api = useApi();

  async function getCategories() {
    const response = await api.get("/categories");
    return response;
  }

  async function getSubCategories() {
    const response = await api.get("/sub-categories");
    return response;
  }

  async function uploadTxt(formData: any) {
    const response = await api.post("/sub-categories/txt", formData);
    return response;
  }

  return {
    getCategories,
    getSubCategories,
    uploadTxt
  };
}
