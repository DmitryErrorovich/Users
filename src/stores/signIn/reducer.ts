import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./actions";
import { initialState } from "./signIn";
import { ISignInInitialState } from "types/signIn";

export const singleUserReducer = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
        loginAction.fulfilled,
      (state: ISignInInitialState, action: any) => {
          console.log({state, action})
        return {
          ...state,
        };
      }
    );
    builder.addCase(
        loginAction.pending,
      (state: ISignInInitialState) => ({
        ...state,
        loading: "pending"
      })
    );
    builder.addCase(
        loginAction.rejected,
      (state: ISignInInitialState) => ({
        ...state,
        loading: "failed"
      })
    );
  }
});
