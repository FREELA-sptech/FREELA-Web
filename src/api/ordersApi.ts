import { useApi } from "./api";
import axios from "axios";

export function OrdersAPI() {
  const api = useApi();

  async function getOrders(order: string) {
    const response = await api.get(`/orders?orderType=${order}`);
    return response;
  }

  async function getAllOrders() {
    const response = await api.get("/orders/get-all-orders");
    return response;
  }

  async function getOrdersByUser() {
    const response = await api.get("/orders/user");
    return response;
  }

  async function getOrdersByUserId(id:number) {
    const response = await api.get(`/orders/by-user-id/${id}`);
    return response;
  }

  async function createOrder(formData: any) {
    const apinew = axios.create({
      baseURL: "http://localhost:9090/"
      //baseURL: "https://api-freela.duckdns.org/"
      //baseURL: "https://bff-freela.duckdns.org/"
    });

    console.warn(formData)

    const response = await apinew.post("/order", formData);
    
    return response;
  }

  async function updatePicture(formData: any, orderId: number) {
    const response = await api.post(`/orders/upload-pictures/${orderId}`, formData);
    return response;
  }

  async function updatePictures(formData: any, orderId: number) {
    const response = await api.put(`/orders/update-pictures/${orderId}`, formData);
    return response;
  }

  async function detailsOrder(orderId: number) {
    const response = await api.get(`/orders/${orderId}`);
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

  async function updateProposals(proposalsId: any, formData:any) {
    const response = await api.put(`/proposals/update/${proposalsId}`, formData);
    return response;
  }

  async function findByTitle(title : string,filter: string) {
    const response = await api.get(`/orders/by-title/${filter}/${title}`);
    return response;
  }

  async function extract() {
    const response = await api.get("/orders/extrato");
    return response
  }

  async function refuseProposal(proposalsId: number) {
    const response = await api.put(`/proposals/refuse-propose/${proposalsId}`);
    return response;
  }

  return {
    getOrders,
    getAllOrders,
    getOrdersByUser,
    createOrder,
    updatePicture,
    getOrdersById,
    detailsOrder,
    deleteOrder,
    updateOrderById,
    aceptProposals,
    sendProposals,
    deleteProposals,
    updateProposals,
    updatePictures,
    findByTitle,
    getOrdersByUserId,
    extract,
    refuseProposal
  };
}
