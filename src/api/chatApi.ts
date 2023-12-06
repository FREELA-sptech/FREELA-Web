import axios from "axios";
import { useApi } from "./api";

export function ChatApi() {
  const api = useApi();

  async function getChats(userId: any, isFreelancer: any) {
    const response = await api.get(`/chats?userId=${userId}&isFreelancer=${isFreelancer}`);
    return response;
  }

  async function createChat(formData: any) {
    const apiChat = axios.create({
      baseURL: "https://freela-chat-service.duckdns.org"
    });

    const response = await apiChat.post("/chats", formData);
    return response;
  }

  async function getMessagesById(id: number) {
    const apiChat = axios.create({
      baseURL: "https://freela-chat-service.duckdns.org"
    });

    const response = await apiChat.get(`/chats/messages/${id}`);
    return response;
  }

  return {
    getChats,
    createChat,
    getMessagesById
  };
}
