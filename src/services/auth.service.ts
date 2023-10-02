
import GenericPaginatedResponse from "../types/responses/generic-paginated-response.type";
import { HTTP400Response } from "../types/responses/http-400-response.type";
import LoginResponse from "../types/responses/login-response.type";
import SimpleResponse from "../types/responses/simple-response.type";
import UserProfileResponse from "../types/responses/user-profile-response.type";
import { httpGet, httpPost, httpPut } from "./http.service";

type RegisterWithEmailPayload = {
    name: string,
    email: string,
    password: string,
    referralCode?: string,
}

type VerifyEmailPayload = {
    email: string,
    token: string,
}

type LoginWithEmailPayload = {
    email: string,
    password: string,
}

type RegisterWithMobilePayload = {
    name: string,
    mobile: string,
    password: string,
    countryCode: string,
    referralCode?: string,
}

type LoginWithMobilePayload = {
    mobile: string,
    password: string,
    countryCode: string,
}

type VerifyMobilePayload = {
    mobile: string,
    otp: string,
}

type UpdateReceivingWalletAddressPayload = {
    receivingWalletType: string,
    receivingWalletAddress: string,
}

interface UpdatePasswordPayload {
    newPassword: string;
    oldPassword: string;
}

const registerWithEmail = async (payload: RegisterWithEmailPayload): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("register/email", payload);
}

const verifyEmail = async (payload: VerifyEmailPayload): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("verify/email", payload);
}

const loginWithEmail = async (payload: LoginWithEmailPayload): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("login/email", payload);
}

const registerWithMobile = async (payload: RegisterWithMobilePayload): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("register/mobile", payload);
}

const verifyMobile = async (payload: VerifyMobilePayload): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("verify/mobile", payload);
}

const loginWithMobile = async (payload: LoginWithMobilePayload): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("login/mobile", payload);
}

const loginWithGoogle = async (accessToken: string, referralCode?: string): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("login/google", {
        referralCode
    }, {
        Authorization: "Bearer " + accessToken
    });
}

const loginWithFacebook = async (accessToken: string, referralCode?: string): Promise<LoginResponse> => {
    return httpPost<LoginResponse>("login/facebook", {
        referralCode
    }, {
        Authorization: "Bearer " + accessToken
    });
}

const requestResetPasswordEmail = async (email: string) => {
    return httpPost<SimpleResponse>("request-reset-password/email", {
        email
    });
}
const requestResetPasswordMobile = async (countryCode: string, mobile: string) => {
    return httpPost<SimpleResponse>("request-reset-password/mobile", {
        countryCode,
        mobile,
    });
}

const resetPasswordEmail = async (email: string, otp: string, password: string) => {
    return httpPost<SimpleResponse>("reset-password/email", {
        email,
        otp,
        password,
    });
}

const resetPasswordMobile = async (mobile: string, otp: string, password: string) => {
    return httpPost<SimpleResponse>("reset-password/mobile", {
        mobile,
        otp,
        password,
    });
}

const updateReceivingWalletAddress = async (payload: UpdateReceivingWalletAddressPayload): Promise<LoginResponse> => {
    return httpPut<LoginResponse>("my/update-receiving-wallet-address", payload);
}

const getUserProfile = async (): Promise<UserProfileResponse> => {
    return httpGet<UserProfileResponse>("my/profile");
}

const updatePassword = async (payload: UpdatePasswordPayload): Promise<UserProfileResponse> => {
    return httpPost<UserProfileResponse>("my/password", payload);
}

export {
    registerWithEmail,
    verifyEmail,
    loginWithEmail,
    registerWithMobile,
    verifyMobile,
    loginWithMobile,
    loginWithGoogle,
    loginWithFacebook,
    requestResetPasswordEmail,
    requestResetPasswordMobile,
    resetPasswordEmail,
    resetPasswordMobile,
    updateReceivingWalletAddress,
    getUserProfile,
    updatePassword,
}
