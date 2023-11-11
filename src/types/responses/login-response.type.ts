import { User } from "../generic/user.type";

interface LoginResponse {
    token: any;
    message: string;
    user: User;
}

export default LoginResponse;