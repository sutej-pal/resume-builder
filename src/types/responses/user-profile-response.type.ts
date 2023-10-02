import { User } from "../generic/user.type";

interface UserProfileResponse {
    message?: string;
    user: User;
}

export default UserProfileResponse;