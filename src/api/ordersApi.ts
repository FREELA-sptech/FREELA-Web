import { useApi } from "./api";

export function OrdersAPI() {
  const api = useApi();

  async function getOrders() {
    const response = await api.get("/orders");
    return response;
  }

  async function createOrder(userId:any,data:any){
    const response = await api.post(`/orders/${userId}`,data);
    return response;
  }

  async function editOrder(orderId:any) {
    const response = await api.get(`/orders/edit/${orderId}`);
    return response;
  }


  return {
    getOrders,
    createOrder,
    editOrder
  };
}
