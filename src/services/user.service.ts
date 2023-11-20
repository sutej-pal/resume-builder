import { httpGet, httpPatch, httpPut } from "./http.service";
import http from "../config/axios.config";
import { getUserTokenFromLS } from "../helpers/storage.helper";

async function updateUserData(payload: any) {
    return await httpPut('update-user-data', payload)
}

async function updateResumeData(id: string, payload: any) {
    return await httpPatch('resumes/' + id, payload);
}
async function getResume(id: string) {
    const url = process.env.REACT_APP_API_ENDPOINT + 'resumes/' + id;
    return (await http.get(url, {
        headers: {
            Authorization: "Bearer " + getUserTokenFromLS(),
        },
        responseType: 'blob'
    })).data;
}

export {
    updateUserData,
    updateResumeData,
    getResume
}