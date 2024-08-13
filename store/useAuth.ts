import { create } from 'zustand'

export type IAuth = {
    user: {
        email: string;
        displayName: string;
    } | null;
    token: string;
};

interface IAuthState {
    user: IAuth['user'],
    token: IAuth['token'];
    setUser(value: IAuth['user']): void;
    setToken(value: string): void;
    logOut(): void
}

export const useAuthStore = create<IAuthState>()((set) => ({
    user: null,
    token: '',
    setUser: (value) => set((state) => ({
        user: value
    })),
    setToken: (value) => set((state) => (
        {
            token: value
        }
    )),
    logOut: () => set((_) => ({
        user: null,
        token: ''
    }))

}))