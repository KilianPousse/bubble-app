import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: { name: 'Guest', id: null },
    isLoadingIn: false,
    isLoading: false,

    login: () => {
        console.log('We are logging in');
        set({ isLoadingIn: true, isLoading: true });
    }
}));