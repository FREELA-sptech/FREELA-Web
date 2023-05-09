import api from "./api";

export const addToken = (token: string) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`

    return config
  })
}
