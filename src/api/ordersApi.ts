import { useApi } from "./api";

export function OrdersAPI() {
  const api = useApi();

  async function getOrders() {
    const response = await api.get("/orders");
    return response;
  }

  async function getOrdersByUser() {
    const response = await api.get("/orders/by-user");
    return response;
  }

  return {
    getOrders,
    getOrdersByUser
  };
}
