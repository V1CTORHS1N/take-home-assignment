import axios from "axios";
import { useGlobalContext } from "./useContext";

const api = "https://6435ce0b537112453fdfd738.mockapi.io/api";

export const useAPI = {
  get: async (path) => {
    try {
      const response = await axios.get(`${api}${path}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (path, data) => {
    const response = await axios.post(`${api}${path}`, data);
    return response.data;
  },
  delete: async (path) => {
    const response = await axios.delete(`${api}${path}`);
    return response.data;
  },
};

export default useAPI;
