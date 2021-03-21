import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../userApi";
import { IUser } from "../../types/users";

export const editUsersAction = createAsyncThunk(
  "EDIT_USERS",
  async (user: IUser) => {
    const response = await api.put(`/put/users`, {
      user
    });
    return response.data;
  }
);

export const fetchUserAction = createAsyncThunk(
  "FETCH_USER",
  async (id: string) => {
    const response = await api.get(`/get/user?id=${id}`);
    return response.data;
  }
);

