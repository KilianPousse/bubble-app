import { create } from "zustand";
import { apiClient } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { useUserStore } from "./useUserStore";

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
            console.error("Error:", error.response || error);
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

      initSocketListeners: () => {
        const socket = useAuthStore.getState().socket;
        if(!socket) return;
        
        const { findUserById } = useUserStore.getState();

        socket.off("friendRequestReceived");
        socket.off("friendRequestAccepted");
        socket.off("friendRequestRejected");
        socket.off("friendRemoved");

        socket.on("friendRequestReceived", async ({ senderId }) => {
            try {
                const sender = await findUserById(senderId);
                set((state) => ({
                    friendRequests: [...state.friendRequests, sender],
                }));
            } 
            catch(error) {
                console.error("Error:", error);
            }
        });

        socket.on("friendRequestAccepted", async ({ friendId }) => {
            try {
                const friend = await findUserById(friendId);
                set((state) => ({
                    friendsList: [...state.friendsList, friend],
                }));
            } 
            catch(error) {
                console.error("Error:", error);
            }
        });

        socket.on("friendRequestRejected", async ({ receiverId }) => {
            try {
                set((state) => ({
                    sentRequests: state.sentRequests.filter((r) => r._id !== receiverId),
                }));
            } 
            catch(error) {
                console.error("Error:", error);
            }
        });

        socket.on("friendRemoved", async ({ userId }) => {
            try {
                set((state) => ({
                    friendsList: state.friendsList.filter((f) => f._id !== userId),
                }));
            } 
            catch(error) {
                console.error("Error:", error);
            }
        });
    },
}));
