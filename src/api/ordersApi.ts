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

  async function createOrder(formData: any) {
    const response = await api.post("/orders/4", formData);
    return response;
  }

  async function updatePicture(formData: any, orderId: number) {
    const response = await api.post(`/orders/upload-pictures/${orderId}`, formData);
    return response;
  }

  return {
    getOrders,
    getOrdersByUser,
    createOrder,
    updatePicture
  };
}
