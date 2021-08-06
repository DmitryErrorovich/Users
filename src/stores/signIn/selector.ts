import { createSelector } from "reselect";
import get from "lodash/get";

const baseState = (state: any) => state.signIn || {};

export const loading = createSelector(
  baseState,
  state => get(state, "loading")
);

export const signInInfo = createSelector(
  baseState,
  state => ({email: get(state, "email") || "", password: get(state, "password") || "", name: get(state, "name") || ""})
);
