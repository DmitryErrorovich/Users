import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../userApi";

interface IPayload {
  limit: number;
  page: number;
}

export const fetchUsersAction = createAsyncThunk(
  "FETCH_USERS",
  async ({ limit, page }: IPayload) => {
    const response = await api.get(`/get/users/?page=${page}&results=${limit}`);
    return response.data;
  }
);
