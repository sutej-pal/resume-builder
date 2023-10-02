import { User } from "../generic/user.type";

interface LoginResponse {
    message: string;
    user: User;
}

export default LoginResponse;