import api from "./api";

export class UserAPI {
  public static async register(userData: any) {
    const response = await api.post("/user", userData);
    return response;
  }

  public static async login(userData: any) {
    const response = await api.post("/user/login", userData);
    return response;
  }
}
