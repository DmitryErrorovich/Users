import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../userApi";

interface IPayload {
  limit: number;
  page: number;
  searchValue: string;
}

export const fetchUsersAction = createAsyncThunk(
  "FETCH_USERS",
  async ({ limit, page, searchValue }: IPayload) => {
    const response = await api.get(`/get/users/?page=${page}&results=${limit}&searchValue=${searchValue}`);
    return response.data;
  }
);

export const cleanUsersAction = createAction(
  "CLEAN_USERS"
);
