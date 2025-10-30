import { create } from "zustand";
import { apiClient } from "../lib/axios";
import toast from "react-hot-toast";

export const useFriendStore = create((set, get) => ({
    friendsList: [],
    isUserLoading: false,
    isFriendActionLoading: false,
    isAddFriendModalOpen: false,

    openAddFriendModal: () => set({ isAddFriendModalOpen: true }),
    closeAddFriendModal: () => set({ isAddFriendModalOpen: false }),

    getFriendsList: async () => {
        set({ isUserLoading: true });
        try {
            const res = await apiClient.get("/friends/list");
            set({ friendsList: res.data });
        } 
        catch(error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } 
        finally {
            set({ isUserLoading: false });
        }
    },

    addToFriendsList: async (friendId) => {
        set({ isFriendActionLoading: true });
        try {
            const res = await apiClient.post(`/friends/add/${friendId}`);
            toast.success(res.data.message || "Friend added successfully");
            await get().getFriendsList();
        } 
        catch(error) {
            toast.error(error.response?.data?.message || "Failed to add friend.");
        } 
        finally {
            set({ isFriendActionLoading: false });
        }
    },

    removeFromFriendsList: async (friendId) => {
        set({ isFriendActionLoading: true });
        try {
            const res = await apiClient.delete(`/friends/remove/${friendId}`);
            toast.success(res.data.message || "Friend removed successfully");
            set((state) => ({
                friendsList: state.friendsList.filter((f) => f._id !== friendId),
            }));
        } 
        catch(error) {
            toast.error(error.response?.data?.message || "Failed to remove friend.");
        } 
        finally {
            set({ isFriendActionLoading: false });
        }
    },
}));
