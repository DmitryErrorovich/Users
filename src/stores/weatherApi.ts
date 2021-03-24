import axios from "axios";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather"
});

weatherApi.defaults.headers.post["Accept"] = "application/json";

export default weatherApi;
