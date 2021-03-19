import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../userApi";
import {IUser} from "../../types/users";

interface IPayload {
    limit: number;
    page: number
}

export const editUsersAction = createAsyncThunk(
    'EDIT_USERS',
    async (user: IUser) => {

        const response = await api.put(`/put/users`,{
            user
        })
        return response.data
    }
)

export const fetchUserAction = createAsyncThunk(
    'FETCH_USER',
    async (id: string) => {
        const response = await api.get(`/get/user?id=${id}`)
        return response.data
    }
)

export const fetchUsersAction = createAsyncThunk(
    'FETCH_USERS',
    async ({limit, page}: IPayload) => {
        const response = await api.get(`/get/users/?page=${page}&results=${limit}`)
        return response.data
    }
)