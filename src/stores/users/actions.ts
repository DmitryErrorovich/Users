import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../userApi";

export const fetchUsersAction = createAsyncThunk(
    'FETCH_USERS',
    async (limit: number) => {
        const response = await api.get(`?results=${limit}`)
        return response.data
    }
)