import { UserStorage } from "../store/userStorage";
import api from "./api";
import { addToken } from "./interceptor";

export class OrdersAPI {
  public static async getOrders() {
    addToken(UserStorage.getTokenUserLocalStorage()!)
    const response = await api.get("/orders");
    return response;
  }
}
