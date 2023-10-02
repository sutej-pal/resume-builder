import { Config } from "../../types/generic/config.type";

export const SET_CONFIG = "SET_CONFIG";

export function setConfigAction(config: Config) {
    return {
        type: SET_CONFIG,
        config,
    };
}

export function configReducer(state = {
    BITCOIN_WALLET_NETWORK: "",
    BITCOIN_WALLET_ADDRESS: "",
    ETHEREUM_WALLET_NETWORK: "",
    ETHEREUM_WALLET_ADDRESS: "",
}, action: any) {
    switch (action.type) {
        case SET_CONFIG:
            return action.config;
        default:
            return state;
    }
} 