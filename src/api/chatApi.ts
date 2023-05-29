import { useApi } from "./api";

export function ChatApi() {
  const api = useApi();

  async function getChats() {
    const response = await api.get("/chats");
    return response;
  }

  async function createChat(formData: any) {
    const response = await api.post("/chats", formData);
    return response;
  }

  async function getMessagesById(id: number) {
    const response = await api.get(`/chats/messages/${id}`);
    return response;
  }

  return {
    getChats,
    createChat,
    getMessagesById
  };
}
