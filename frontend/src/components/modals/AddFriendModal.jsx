import { useState, useEffect } from "react";
import { useFriendStore } from "../../store/useFriendStore";
import Avatar from "../Avatar";
import { AddFriendIcon } from "../../lib/icons";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";

function AddFriendModal() {
  const { authUser } = useAuthStore();
  const { findUsersByTagOrName } = useUserStore();
  const { 
    friendsList, 
    sentRequests,
    isFriendActionLoading, 
    sendFriendRequest,
  } = useFriendStore();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const result = await findUsersByTagOrName(search);
      setUsers(result);
    } 
    catch(error) {
      console.error(error);
    } 
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(search.trim().length > 0) {
      handleSearch();
    } else {
      setUsers([]);
    }
  }, [search, friendsList, sentRequests]);

  const renderStatus = (user) => {
    if(user.tag === authUser.tag) return <span className="bg-slate-600 px-3 py-0.5 mx-2 rounded-3xl text-[10px] text-slate-300">You</span>;
    if(friendsList.some(friend => friend._id === user._id)) return <span className="bg-slate-600 px-3 py-0.5 mx-2 rounded-3xl text-[10px] text-slate-300">Friend</span>;
    if(sentRequests.some(f => f._id === user._id)) return <span className="bg-slate-600 px-3 py-0.5 mx-2 rounded-3xl text-[10px] text-slate-300">Request Sent</span>;
    return null;
  }

  const isButtonDisabled = (user) => {
    return user.tag === authUser.tag
      || friendsList.some(friend => friend._id === user._id)
      || sentRequests.some(f => f._id === user._id);
  }

  return (
    <div className="min-w-[24rem]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-bold text-xl flex items-center gap-2">
            <AddFriendIcon className="w-6 h-6" />
            Add a Friend
          </h3>
          
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
                    <p className="text-white font-medium truncate">
                      {user.username} {renderStatus(user)}
                    </p>
                    <p className="text-slate-400 text-sm truncate">@{user.tag}</p>
                  </div>
                </div>
                <button
                  disabled={isButtonDisabled(user)}
                  onClick={() => {sendFriendRequest(user._id)}}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium disabled:bg-slate-600 disabled:text-slate-400 transition-all duration-200"
                >
                  {isFriendActionLoading ? <span className="loading"/> : <AddFriendIcon />}
                </button>
              </div>
            ))
          )}
        </div>
    </div>
  );
}

export default AddFriendModal;
