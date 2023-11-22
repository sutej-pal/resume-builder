import axios from "axios";
import { getUserTokenFromLS } from "../helpers/storage.helper";
import { toast } from "react-toastify";
import http from "../config/axios.config";

async function httpGet<T>(url: string, headers?: any, params?: any): Promise<T> {
    const endpoint = url.startsWith("http") ? url : 'https://resume-builder-server-3gb9.onrender.com/api/' + url;
    return (await http.get<T>(endpoint, {
        headers: {
            Authorization: "Bearer " + getUserTokenFromLS(),
            ...headers,
        },
        params: params
    })).data;
}
async function httpPost<T>(url: string, payload: any, headers?: any): Promise<T> {
    const endpoint = url.startsWith("http") ? url : 'https://resume-builder-server-3gb9.onrender.com/api/' + url;
    return (await http.post<T>(endpoint, payload, {
        headers: {
            Authorization: "Bearer " + getUserTokenFromLS(),
            ...headers,
        }
    })).data;
}
async function httpPut<T>(url: string, payload: any, headers?: any): Promise<T> {
    const endpoint = url.startsWith("http") ? url : 'https://resume-builder-server-3gb9.onrender.com/api/' + url;
    return (await http.put<T>(endpoint, payload, {
        headers: {
            Authorization: "Bearer " + getUserTokenFromLS(),
            ...headers,
        }
    })).data;
}

async function httpPatch<T>(url: string, payload: any, headers?: any): Promise<T> {
    const endpoint = url.startsWith("http") ? url : process.env.REACT_APP_API_ENDPOINT + url;
    return (await http.patch<T>(endpoint, payload, {
        headers: {
            Authorization: "Bearer " + getUserTokenFromLS(),
            ...headers,
        }
    })).data;
}

function handleError(error: any) {
    class CustomError {
        data: {};
        message: string;
        constructor(message = "", data = {}) {
            this.message = message;
            this.data = data;
        }
    }

    if (axios.isAxiosError(error)) {
        if (error?.response?.status === 422) {
            // validation error
            toast.error("Some validation error occurred");
            return new CustomError('Some validation error occurred', error?.response?.data.errors);
        } else {
            toast.error(error.response?.data.message);
            return new CustomError(error.response?.data.message);
        }
    } else {
        toast.error("Something went wrong");
        return new CustomError('Something went wrong');
    }
}

export {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    handleError
}
