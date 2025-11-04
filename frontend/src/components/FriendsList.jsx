import { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import Avatar from "./Avatar";
import { AddFriendIcon, EnvelopeIcon, UserIcon } from "./icons";
import NotificationBadge from "./NotificationBadge";
import { useModal } from "../context/ModalContext";

function FriendsList() {
  const {
    friendsList,
    friendRequests,
    loadFriendsList,
  } = useFriendStore();
  const { openModal } = useModal();

  useEffect(() => {
    loadFriendsList();
  }, [loadFriendsList]);

  return (
    <div className="bg-[#182234] backdrop-blur-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4 relative">
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-600/40 to-transparent"></div>
        <div>
          <h2 className="text-white font-bold text-2xl">My Friends</h2>
          <p className="text-slate-400 text-sm mt-1">
            {friendsList.length} {friendsList.length === 1 ? 'friend' : 'friends'}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('friend-requests')}
            className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg relative"
            title="Show Friend Requests List"
          >
            <EnvelopeIcon />
            <NotificationBadge count={friendRequests.length} />
          </button>
          
          <button
            onClick={() => openModal('add-friend')}
            className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            title="Add Friend"
          >
            <AddFriendIcon />
          </button>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-hidden ">
        <div className="h-full overflow-y-auto custom-scrollbar">
          {friendsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                <UserIcon color="#0EA5E999" />
              </div>
              <p className="text-slate-400 text-lg mb-2">No friends yet</p>
              <p className="text-slate-500 text-sm max-w-xs mb-4">
                Add some friends to start chatting and sharing moments together
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-3 mx-2">
              {friendsList.map((friend) => (
                <button 
                  key={friend._id} 
                  onClick={() => openModal('profile-card', { user: friend })}
                  className="flex items-center gap-4 px-4 py-1.5 rounded-2xl hover:bg-slate-700/30 transition-all duration-200 cursor-pointer group w-full text-left"
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

                  {/* Online Status Indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsList;