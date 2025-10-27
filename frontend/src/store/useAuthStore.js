import { create } from 'zustand';
import { apiClient } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await apiClient.get('/auth/check');
            set({ authUser: res.data });
        } 
        catch(error) {
            console.error("Error checking auth:", error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await apiClient.post('/auth/signup', data);
            set({ authUser: res.data });
            
            toast.dismiss();
            toast.success("Signup successful");
        } 
        catch(error) {
            toast.dismiss();
            toast.error(error.response.data.message || "Signup failed");
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await apiClient.post('/auth/login', data);
            set({ authUser: res.data });

            toast.dismiss();
            toast.success("Login successful");
        } 
        catch(error) {
            toast.dismiss();
            toast.error(error.response.data.message || "Login failed");
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
            set({ authUser: null });

            toast.dismiss();
            toast.success("Logged out successfully");
        }
        catch(error) {
            toast.dismiss();
            toast.error("Logout failed");
            console.error("Error during logout:", error);
        }
    },
}));