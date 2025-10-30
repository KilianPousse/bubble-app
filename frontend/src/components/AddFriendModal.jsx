import { useState, useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { apiClient } from "../lib/axios";
import Avatar from "./Avatar";
import { AddFriendIcon } from "./icons";
import { useAuthStore } from "../store/useAuthStore";

function AddFriendModal({ onClose }) {
  const { authUser } = useAuthStore();
  const { addToFriendsList, friendActionLoadingId, friendsList } = useFriendStore();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get(`/users/search?query=${search}`);
      const filtered = res.data.filter(
        (user) => !friendsList.some((friend) => friend._id === user._id || authUser._id === user._id)
      );
      setUsers(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      handleSearch();
    } else {
      setUsers([]);
    }
  }, [search, friendsList]);

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-slate-800 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-[400px] max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-bold text-xl flex items-center gap-2">
            <AddFriendIcon className="w-6 h-6" />
            Add a Friend
          </h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-700 hover:bg-red-600/20 border border-red-600 transition-all duration-200 p-2 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by tag or username..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <p className="text-slate-400 text-base"><span className="loading"/></p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex justify-center py-4">
              <p className="text-slate-500 text-base italic">
                {search.trim().length > 0 ? "No users found" : "Start typing to search"}
              </p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Avatar size={50} user={user} />
                  <div className="max-w-[180px]">
                    <p className="text-white font-medium truncate">{user.username}</p>
                    <p className="text-slate-400 text-sm truncate">@{user.tag}</p>
                  </div>
                </div>
                <button
                  disabled={friendActionLoadingId === user._id}
                  onClick={() => addToFriendsList(user._id)}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium disabled:bg-slate-600 disabled:text-slate-400 transition-all duration-200"
                >
                  {friendActionLoadingId === user._id ? <span className="loading"/> : <AddFriendIcon />}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;
