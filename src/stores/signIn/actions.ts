import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const loginAction = createAsyncThunk(
  "LOG_IN",
  async (loginInfo: any) => {
    const response = await api.post(`/login`, loginInfo);
    return response.data;
  }
);
