import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

// prepare the default state

let auth = localStorage.getItem("rb.user") || null;
if (auth) {
    auth = JSON.parse(auth)
}
const state = {
    auth
};

// prepare the store
let composeEnhancers;
const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middlewares.push(logger as any);
} else {
    composeEnhancers = compose;
}

export const store = createStore(
    rootReducer,
    state,
    composeEnhancers(applyMiddleware(...middlewares))
);
