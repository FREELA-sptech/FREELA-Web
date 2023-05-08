import api from "./api";

export async function getCategoriesService(){
  const response = await api.get("/categories");
  return response;
}
