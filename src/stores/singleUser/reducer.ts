import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { editUsersAction, fetchUserAction } from "./actions";
import { initialState } from "./singleUser";
import { ISingleUserInitialState } from "types/singleUser";

export const singleUserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      editUsersAction.fulfilled,
      (state: ISingleUserInitialState, action: any) => {
        return {
          ...state,
          user: get(action, "payload.user"),
          updating: "succeeded"
        };
      }
    );
    builder.addCase(
      editUsersAction.pending,
      (state: ISingleUserInitialState, action: any) => ({
        ...state,
        updating: "pending"
      })
    );
    builder.addCase(
      editUsersAction.rejected,
      (state: ISingleUserInitialState, action: any) => ({
        ...state,
        updating: "failed"
      })
    );
    builder.addCase(
      fetchUserAction.fulfilled,
      (state: ISingleUserInitialState, action: any) => {
        return {
          ...state,
          user: get(action, "payload.user"),
          loading: "succeeded"
        };
      }
    );
    builder.addCase(
      fetchUserAction.pending,
      (state: ISingleUserInitialState, action: any) => {
        return {
          ...state,
          loading: "pending"
        };
      }
    );
    builder.addCase(
      fetchUserAction.rejected,
      (state: ISingleUserInitialState, action: any) => {
        return {
          ...state,
          loading: "failed"
        }
      }
    );
  }
});
