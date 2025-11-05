import { create } from "zustand";
import { apiClient } from "../lib/axios";
import toast from "react-hot-toast";

export const useFriendStore = create((set, get) => ({
    friendsList: [],
    friendRequests: [],
    sentRequests: [],
    isFriendActionLoading: false,

    loadFriendsList: async () => {
    try {
        const res = await apiClient.get("/friends/list");

        set({
            friendsList: res.data.friends || [],
            friendRequests: res.data.friendRequests || [],
            sentRequests: res.data.sentRequests || [],
        });
    } 
    catch(error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
    }
    },

    sendFriendRequest: async (friendId) => {
        if(!friendId) return toast.error("Invalid user ID");
        set({ isFriendActionLoading: true });
        try {
            const res = await apiClient.post(`/friends/request/${friendId}`);
            toast.success(res.data.message);
            await get().loadFriendsList();
        } 
        catch(error) {
            console.error("Friend request error:", error.response || error);
            toast.error(error.response?.data?.message || "Failed to send request.");
        } 
        finally {
            set({ isFriendActionLoading: false });
        }
    },


    acceptFriendRequest: async (friendId) => {
        set({ isFriendActionLoading: true });
        try {
            const res =  await apiClient.post(`/friends/accept/${friendId}`);
            toast.success(res.data.message);
            await get().loadFriendsList();
        }
        catch(error) {
            toast.error(error.response?.data?.message || "Failed to accept request.");
        } 
        finally {
            set({ isFriendActionLoading: false });
        }
    },

    rejectFriendRequest: async (friendId) => {
        set({ isFriendActionLoading: true });
        try {
            const res =  await apiClient.post(`/friends/reject/${friendId}`);
            toast.success(res.data.message);
            await get().loadFriendsList();
        }
        catch(error) {
            toast.error(error.response?.data?.message || "Failed to reject request.");
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
