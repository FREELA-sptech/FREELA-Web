import api from "./api";

export class CategoriesAPI {
  public static async getCategories() {
    const response = await api.get("/categories");
    return response;
  }

  public static async getSubCategories() {
    const response = await api.get("/sub-categories");
    return response;
  }
}
