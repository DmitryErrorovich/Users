import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logOutAction, signUpAction } from "./actions";
import { initialState } from "./signIn";
import { ISignInInitialState } from "types/signIn";

export const signInReducer = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loginAction.fulfilled,
      (state: ISignInInitialState, action: any) => {
        console.log({ state, action })
        return {
          ...state,
          ...action.payload,
          loading: "succeeded"
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
    builder.addCase(
      signUpAction.fulfilled,
      (state: ISignInInitialState, action: any) => {
        console.log({ state, action })
        return {
          ...state,
          loading: "succeeded"
        };
      }
    );
    builder.addCase(
      signUpAction.pending,
      (state: ISignInInitialState) => ({
        ...state,
        loading: "pending"
      })
    );
    builder.addCase(
      signUpAction.rejected,
      (state: ISignInInitialState) => ({
        ...state,
        loading: "failed"
      })
    );
    builder.addCase(
      logOutAction,
      () => ({
        ...initialState,
        token: "",
      })
    );
  }
});
