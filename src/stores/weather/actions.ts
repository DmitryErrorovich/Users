import { createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "stores/weatherApi";

export interface IPayload {
  lon: number;
  lat: number;
  unit: string;
}

export const fetchWeatherAction = createAsyncThunk(
  "FETCH_WEATHER",
  async ({lon, lat, unit="metric"}: IPayload) => {
    const response = await weatherApi.get(
      `?lat=${lat}&lon=${lon}&units=${unit}&appid=bc75b2b6ef48d2ecb8b56f2745624732`
    );
    return response.data;
  }
);
