import { getUserProfile } from "../../services/auth.service";
import { User } from "../../types/generic/user.type";
import { StoreState } from "../../types/store-state.type";

// Actions
export const CREATE_SESSION = "CREATE_SESSION";
export const UPDATE_SESSION = "UPDATE_SESSION";
export const DESTROY_SESSION = "DESTROY_SESSION";

/**
 * Add a user to state
 * @param {*} user
 * @returns
 */
export function createSession(user: User) {
    return {
        type: CREATE_SESSION,
        user,
    };
}
/**
 * Update a user in state
 * @param {*} user
 * @returns
 */
export function updateSession(user: User) {
    return {
        type: UPDATE_SESSION,
        user,
    };
}

/**
 * Remove the user from state
 * @returns
 */
export function destroySession() {
    return {
        type: DESTROY_SESSION,
    };
}

export function fetchUserProfile() {
    return async (dispatch: any, state: StoreState) => {
        const { user } = await getUserProfile();
        const oldUser = JSON.parse(localStorage.getItem('rb.user') ?? "");
        const newUser = { ...oldUser, ...user };
        localStorage.setItem('rb.user', JSON.stringify(newUser));
        dispatch(updateSession(newUser));
    }
}


/**
 * Main Auth Reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export function authReducer(state = null, action: any) {
    switch (action.type) {
        case CREATE_SESSION:
            return action.user;
        case UPDATE_SESSION:
            return { ...(state ?? {}), ...action.user };
        case DESTROY_SESSION:
            return null;
        default:
            return state;
    }
}
