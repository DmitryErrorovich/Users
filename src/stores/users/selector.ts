import { createSelector } from "reselect";
import get from "lodash/get";

const baseState = (state: any) => state.users || {};

export const loading = createSelector(
  baseState,
  state => get(state, "loading")
);

export const users = createSelector(
  baseState,
  state => get(state, "users")
);

export const totalPages = createSelector(
  baseState,
  state => get(state, "totalPages")
);
