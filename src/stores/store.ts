import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { usersReducer } from "./users/reducer";
import { weatherReducer } from "./weather/reducer";
import { singleUserReducer } from "./singleUser/reducer";
import { signInReducer } from "./signIn/reducer";

const rootReducer = combineReducers({
  users: usersReducer.reducer,
  weather: weatherReducer.reducer,
  singleUser: singleUserReducer.reducer,
  signIn: signInReducer.reducer
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
