import { httpPut } from "./http.service";

async function updateUserData (payload: any) {
    return await httpPut('update-user-data', payload)
}

export {
    updateUserData
}