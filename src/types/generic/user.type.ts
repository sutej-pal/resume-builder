export interface User {
    id: string;
    name: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    fromReferral: string;
    referralCode: string;
    createdAt: Date;
    updatedAt: Date;
}