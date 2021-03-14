import {createSelector} from "reselect";
import get from "lodash/get";

const baseState = (state: any) => state.weather || {};

export const loading = createSelector(baseState, state => get(state, "loading") );

export const weatherSelector = createSelector(baseState, state => get(state, "weather"));