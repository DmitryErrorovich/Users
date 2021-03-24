import axios from "axios";

const api = axios.create({
  baseURL: "https://users-api-lzss0r9o3-dmitryerrorovich.vercel.app/api/users"
});

api.defaults.headers.post["Accept"] = "application/json";

export default api;
