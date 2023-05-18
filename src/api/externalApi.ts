import axios from "axios";

const apiExternal = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
})


export class ExternalAPI {
  public static async getUFS() {
    const response = await apiExternal.get("/estados?orderBy=nome");
    return response;
  }

  public static async getCitys(uf: string) {
    const response = await apiExternal.get(`estados/${uf}/municipios?orderBy=nome`);
    return response;
  }
}
