import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersAction } from "./actions";
import {  initialState } from "./users";
import { IUsersInitialState } from "types/users";

// Then, handle actions in your reducers:
export const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsersAction.fulfilled,
      (state: IUsersInitialState, action: any) => {
        // Add user to the state array
        console.log({action})
        return {
          ...state,
          users: get(action, "payload.users"),
          loading: 'succeeded'
        };
      }
    );
    builder.addCase(
      fetchUsersAction.rejected,
      (state: IUsersInitialState, action: any) => ({
          ...state,
          loading: 'failed'
        })
      
    );
  }
});
