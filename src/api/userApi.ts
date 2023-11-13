import { useApi } from "./api";

export function UserAPI() {
  const api = useApi();

  async function register(userData: any) {
    const response = await api.post("/users", userData);
    return response;
  }

  async function login(userData: any) {
    const response = await api.post("/users/authenticate", userData);
    return response;
  }

  async function userDetails() {
    const response = await api.get(`/users`);
    return response;
  }

  async function userDetailsById(id:number) {
    const response = await api.get(`/users/details-by-id/${id}`);
    return response;
  }

  async function uploadPicture(file: any) {
    const response = await api.put(`/users/profile-photo`, file);
    return response;
  }

  async function updateUser(newUser: any) {
    const response = await api.patch(`/users`, newUser);
    return response;
  }

  async function getFreelancersByInterests() {
    const response = await api.get(`/users/freelancers`);
    return response;
  }

  async function getProposalsByUser(){
    const response = await api.get(`/proposals/user`);
    return response;
  }

  async function getProposalsByUserId(id:number){
    const response = await api.get(`/proposals/user-id/${id}`);
    return response;
  }

  return {
    register,
    login,
    userDetails,
    uploadPicture,
    updateUser,
    getFreelancersByInterests,
    getProposalsByUser,
    getProposalsByUserId,
    userDetailsById
  };
}
