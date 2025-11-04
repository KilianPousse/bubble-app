import { useEffect } from "react";
import { useFriendStore } from "../../store/useFriendStore";
import Avatar from "../Avatar";

function FriendRequestsModal() {
  const { friendRequests, isFriendActionLoading, acceptFriendRequest, rejectFriendRequest, loadFriendsList } = useFriendStore();

  useEffect(() => {
    loadFriendsList();
  }, []);

  return (
    <div className="min-w-[24rem]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-xl">
          Friend Requests
        </h3>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {friendRequests.length === 0 ? (
          <div className="flex justify-center py-4">
            <p className="text-slate-500 text-base italic">
              You have no friend requests
            </p>
          </div>
        ) : (
          friendRequests.map((request) => (
            <div
              key={request._id}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Avatar size={50} user={request} />
                <div className="max-w-[180px]">
                  <p className="text-white font-medium truncate">{request.username}</p>
                  <p className="text-slate-400 text-sm truncate">@{request.tag}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  disabled={isFriendActionLoading}
                  onClick={() => acceptFriendRequest(request._id)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium disabled:bg-slate-600 disabled:text-slate-400 transition-all duration-200"
                >
                  {isFriendActionLoading ? <span className="loading" /> : "Accept"}
                </button>
                <button
                  disabled={isFriendActionLoading}
                  onClick={() => rejectFriendRequest(request._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium disabled:bg-slate-600 disabled:text-slate-400 transition-all duration-200"
                >
                  {isFriendActionLoading ? <span className="loading" /> : "Reject"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FriendRequestsModal;
