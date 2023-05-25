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

  async function updateOrderById(orderId: number, formData: any) {
    const response = await api.put(`/orders/update/${orderId}`, formData);
    return response;
  }

  async function aceptProposals(orderId: number, proposalsId: number) {
    const response = await api.post(`/orders/${orderId}/${proposalsId}`);
    return response;
  }

  async function sendProposals(orderId: number, formData: any) {
    const response = await api.post(`/proposals/${orderId}`, formData);
    return response;
  }

  async function deleteProposals(proposalsId: any) {
    const response = await api.delete(`/proposals/${proposalsId}`);
    return response;
  }

  async function updateProposals(proposalsId: any, formData) {
    const response = await api.put(`/proposals/update/${proposalsId}`, formData);
    return response;
  }

  return {
    getOrders,
    getOrdersByUser,
    createOrder,
    updatePicture,
    getOrdersById,
    editOrder,
    deleteOrder,
    updateOrderById,
    aceptProposals,
    sendProposals,
    deleteProposals,
    updateProposals
  };
}
