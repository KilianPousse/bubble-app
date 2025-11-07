
import { useModal } from "../../context/ModalContext";
import Avatar from "../Avatar";

function FriendsListItem({ friend }) {
    const { openModal } = useModal();

    return (
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
        </button>
    );
}

export default FriendsListItem;