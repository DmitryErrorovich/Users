import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersAction } from "./actions";
import { initialState } from "./users";
import { IUsersInitialState } from "types/users";

export const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsersAction.fulfilled,
      (state: IUsersInitialState, action: any) => {
        return {
          ...state,
          users: get(action, "payload.users"),
          loading: "succeeded"
        };
      }
    );
    builder.addCase(
      fetchUsersAction.pending,
      (state: IUsersInitialState, action: any) => {
        return {
          ...state,
          loading: "pending"
        };
      }
    );
    builder.addCase(
      fetchUsersAction.rejected,
      (state: IUsersInitialState, action: any) => ({
        ...state,
        loading: "failed"
      })
    );

  }
});
