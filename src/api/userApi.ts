import api from "./api";

export class UserAPI {
  public static async register(userData: any) {
    const response = await api.post("/users", userData);
    return response;
  }

  public static async login(userData: any) {
    const response = await api.post("/users/login", userData);
    return response;
  }
}
