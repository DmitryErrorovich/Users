import axios from "axios";

const api = axios.create({
  baseURL: "http://users-api-dmitryerrorovich.vercel.app/api/users"
});

api.defaults.headers.post["Accept"] = "application/json";

export default api;
