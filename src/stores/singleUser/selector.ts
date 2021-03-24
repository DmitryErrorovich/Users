import { createSelector } from "reselect";
import get from "lodash/get";

const baseState = (state: any) => state.singleUser || {};

export const loading = createSelector(
  baseState,
  state => get(state, "loading")
);

export const updatingUser = createSelector(
  baseState,
  state => get(state, "updating")
);

export const selectedUser = createSelector(
  baseState,
  state => get(state, "user") || {}
);
