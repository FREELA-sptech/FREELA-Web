import { useApi } from "./api";

export function UserAPI() {
  const api = useApi();

  async function register(userData: any) {
    const response = await api.post("/user", userData);
    return response;
  }

  async function login(userData: any) {
    const response = await api.post("/user/login", userData);
    return response;
  }

  async function userDetails() {
    const response = await api.get(`/user/details`);
    return response;
  }

  async function uploadPicture(file: any) {
    const response = await api.post(`/user/upload-image`, file);
    return response;
  }

  async function updateUser(newUser: any) {
    const response = await api.patch(`/user`, newUser);
    return response;
  }

  async function getFreelancersByInterests() {
    const response = await api.get(`/user/by-subcategories`);
    return response;
  }

  return {
    register,
    login,
    userDetails,
    uploadPicture,
    updateUser,
    getFreelancersByInterests,
  };
}
