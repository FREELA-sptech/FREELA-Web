import api from "./api";

export async function createUser(userData: any){
    
    const response = await api.post("/users",userData);
    return response.data;
}