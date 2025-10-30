import { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import Avatar from "./Avatar";
import { AddFriendIcon, UserIcon } from "./icons";

function FriendsList() {
  const {
    friendsList,
    getFriendsList,
    openAddFriendModal,
  } = useFriendStore();

  useEffect(() => {
    getFriendsList();
  }, [getFriendsList]);

  return (
    <div className="bg-[#182234] backdrop-blur-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4">
        <div>
          <h2 className="text-white font-bold text-2xl">My Friends</h2>
          <p className="text-slate-400 text-sm mt-1">
            {friendsList.length} {friendsList.length === 1 ? 'friend' : 'friends'}
          </p>
        </div>
        <button
          onClick={openAddFriendModal}
          className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          title="Add Friend"
        >
          <AddFriendIcon />
        </button>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-hidden px-3">
        <div className="h-full overflow-y-auto custom-scrollbar">
          {friendsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                <UserIcon color="#0EA5E999"/>
              </div>
              <p className="text-slate-400 text-lg mb-2">No friends yet</p>
              <p className="text-slate-500 text-sm max-w-xs mb-4">
                Add some friends to start chatting and sharing moments together
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-3">
              {friendsList.map((friend) => (
                <div 
                  key={friend._id} 
                  className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="relative">
                    <Avatar size={52} user={friend} />
                    <div className="absolute -bottom-1 -right-1">
                      <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold truncate">
                        {friend.username || friend.tag}
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm truncate">@{friend.tag}</p>
                  </div>

                  {/* Statut */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    
    </div>
  );
}

export default FriendsList;