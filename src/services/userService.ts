import api from "./api";

export async function createUser(userData: any){
    const response = await api.post("/user",userData);
    return {data: response.data,status: response.status};
}

export async function login(userData: any){
    const response = await api.post("/user/login",userData);
    return {data:response.data,status:response.status}
}