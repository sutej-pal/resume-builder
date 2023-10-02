import { Config } from "./generic/config.type";
import { User } from "./generic/user.type";

export interface StoreState {
    auth: User,
    config: Config,
};
