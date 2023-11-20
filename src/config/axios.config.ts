import axios from 'axios';
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        "Content-type": "application/json"
    }
});

instance.interceptors.request.use(
    (config) => {
        // You can modify the request headers or do other tasks here
        // For example, add an authorization token if you have one
        // config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        // You can modify the response data or do other tasks here
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            toast.error('labels.unauthorized', {
                toastId: 'error-401',
            });
            window.location.href = '/';
        } else if (error.response?.status === 400) {
            const errorMessages = error.response?.data?.errorMessages || [];
            if (errorMessages.length > 0) {
                errorMessages.forEach((msg: string) => {
                    if (`apiErrors.${msg}`.includes('apiErrors')) {
                        toast.error(msg, {
                            toastId: 'error-404',
                        });
                    } else {
                        toast.error(`apiErrors.${msg}`, {
                            toastId: 'error-404',
                        });
                    }
                });
            } else {
                toast.error("apiErrors.SYSTEM_ERROR", {
                    toastId: 'error-404',
                });
            }
        } else if (error.response?.status === 503) {
            toast.error('Service not available', {
                toastId: 'error-503',
            });
        }
        return Promise.reject(error);
    }
);

export default instance;
