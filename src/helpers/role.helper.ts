import { User } from "../types/generic/user.type";

function isAdmin(user: User | null): boolean {
    return user?.role === "admin";
}

export {
    isAdmin,
}
