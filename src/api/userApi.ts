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

  public static async userDetails(idUser: number) {
    const response = await api.get("/user/edit/5");
    return response;
  }

  public static async uploadPicture(idUser: number, file: any) {
    const response = await api.post("/user/upload-image/4", file);
    return response;
  }

  public static async updateUser(idUser: number, newUser: any) {
    const response = await api.patch("/user/4", newUser);
    return response;
  }
}
