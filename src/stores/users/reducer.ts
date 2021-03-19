import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import {fetchUsersAction, editUsersAction, fetchUserAction} from "./actions";
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
    builder.addCase(
        editUsersAction.fulfilled,
          (state: IUsersInitialState, action: any) => {
            const updatedUsers = state.users.map(item => {
                return item._id === get(action, "payload.user._id") ? {
                    ...item,
                    ...get(action, "payload.user")
                } : item
            })
            return {
                ...state,
                users: updatedUsers,
                loading: 'succeeded'
            }
          }

    );
      builder.addCase(
          fetchUserAction.fulfilled,
          (state: IUsersInitialState, action: any) => {
              return {
                  ...state,
                  user: get(action, "payload.user"),
                  loading: 'succeeded'
              }
          }

      );
  }
});
