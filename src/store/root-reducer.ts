import { combineReducers } from "redux";
import { authReducer } from "./auth.store";
import { configReducer } from "./config.store";

export const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
});
