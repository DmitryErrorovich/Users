import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersAction, editUsersAction, fetchUserAction } from "./actions";
import { initialState } from "./users";
import { IUsersInitialState } from "types/users";
// TODO: SPLIT STORES ON SINGLE AND LIST
export const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsersAction.fulfilled,
      (state: IUsersInitialState, action: any) => {
        console.log({ action });
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
    builder.addCase(
      editUsersAction.fulfilled,
      (state: IUsersInitialState, action: any) => {
        return {
          ...state,
          user: get(action, "payload.user"),
          updating: "succeeded"
        };
      }
    );
    builder.addCase(
      editUsersAction.pending,
      (state: IUsersInitialState, action: any) => ({
        ...state,
        updating: "pending"
      })
    );
    builder.addCase(
      editUsersAction.rejected,
      (state: IUsersInitialState, action: any) => ({
        ...state,
        updating: "failed"
      })
    );
    builder.addCase(
      fetchUserAction.fulfilled,
      (state: IUsersInitialState, action: any) => {
        return {
          ...state,
          user: get(action, "payload.user"),
          loading: "succeeded"
        };
      }
    );
    builder.addCase(
      fetchUserAction.pending,
      (state: IUsersInitialState, action: any) => {
        return {
          ...state,
          loading: "pending"
        };
      }
    );
    builder.addCase(
      fetchUserAction.rejected,
      (state: IUsersInitialState, action: any) => ({
        ...state,
        loading: "failed"
      })
    );
  }
});
