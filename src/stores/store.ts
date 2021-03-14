import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import  {usersReducer}  from "./users/reducer";
import { weatherReducer } from "./weather/reducer";

const rootReducer = combineReducers({
    users: usersReducer.reducer,
    weather: weatherReducer.reducer
})

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
);