import { Config } from "../generic/config.type";

interface ConfigResponse {
    message: string;
    config: Config;
}

export default ConfigResponse;