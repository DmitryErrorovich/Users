import get from "lodash/get";

import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherAction } from "./actions";
import {  initialState } from "./weather";
import { IWeatherInitialState } from "types/weather";

export const weatherReducer = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchWeatherAction.fulfilled,
      (state: IWeatherInitialState, action: any) => {
        // TODO: interface for action
        console.log({action})
        return {
          ...state,
          weather: get(action, "payload"),
          loading: 'succeeded'
        };
      }
    );
    builder.addCase(
      fetchWeatherAction.rejected,
      (state: IWeatherInitialState, action: any) => ({ // TODO: handle errors
          ...state,
          loading: 'failed'
        })
      
    );
  }
});
