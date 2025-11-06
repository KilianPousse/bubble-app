import { create } from "zustand";
import { apiClient } from "../lib/axios";

export const useUserStore = create((set, get) => ({

    findUserById: async (id) => {
        if(!id) return null;

        try {
            const res = await apiClient.get(`/users/get/${id}`);
            return res.data || null;
        } 
        catch(error) {
            console.error("Error fetching user by ID:", error.response?.data || error);
            return null;
        }
    },

    findUsersByTagOrName: async (query) => {
        if(!query?.trim()) return [];

        try {
            const res = await apiClient.get(`/users/search?query=${query}`);
            return res.data || [];
        } 
        catch(error) {
            console.error("Error searching users:", error.response?.data || error);
            return [];
        }
    },
}));
