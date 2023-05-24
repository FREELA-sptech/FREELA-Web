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
    const response = await api.post("/orders", formData);
    return response;
  }

  async function updatePicture(formData: any, orderId: number) {
    const response = await api.post(`/orders/upload-pictures/${orderId}`, formData);
    return response;
  }

  async function editOrder(orderId: number) {
    const response = await api.get(`/orders/edit/${orderId}`);
    return response;
  }
  async function deleteOrder(orderId: number) {
    const response = await api.delete(`/orders/${orderId}`);
    return response;
  }

  async function getOrdersById(orderId: number) {
    const response = await api.get(`/orders/edit/${orderId}`);
    return response;
  }

  return {
    getOrders,
    getOrdersByUser,
    createOrder,
    updatePicture,
    getOrdersById
    editOrder,
    deleteOrder
  };
}
