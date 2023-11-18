import { httpGet, httpPatch, httpPut } from "./http.service";

async function updateUserData (payload: any) {
    return await httpPut('update-user-data', payload)
}

async function updateResumeData(payload: any) {
return await httpPatch('resumes/1234', payload);
}
async function getResume(payload: any) {
return await httpGet('resumes/1234', payload);
}

export {
    updateUserData,
    updateResumeData
}