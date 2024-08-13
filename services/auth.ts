import request from "../lib/axios";

interface IAuth {
    email: string;
    password: string;
};

const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY!

export const registerMutation = async (data: IAuth) => {
    return await request({
        baseURL: 'https://identitytoolkit.googleapis.com/v1',
        url: `/accounts:signUp?key=${API_KEY}`,
        method: 'POST',
        data
    });
};

export const loginMutation = async (data: IAuth) => {
    return await request({
        baseURL: 'https://identitytoolkit.googleapis.com/v1',
        url: `/accounts:signInWithPassword?key=${API_KEY}`,
        method: 'POST',
        data
    });
};