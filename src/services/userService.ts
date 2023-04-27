import api from "./api";

export async function setCreateUser(userData: any) {
  const response = await api.post("/user", userData);
  return response;
}

export async function getLogin(userData: any) {
  const response = await api.post("/user/login", userData);
  return response;
}

export async function getCategories() {
  const response = await api.get("/categories");
  return response;
}
