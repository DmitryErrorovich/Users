import axios from "axios";

const api = axios.create({
  baseURL: "https://users-api-dmitryerrorovich.vercel.app/api"
});

api.defaults.headers.post["Accept"] = "application/json"; 
api.defaults.headers.post["Authorization"] = `Bearer fdsgagfgfdgdfsgfdgjwer`
api.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

export default api;
