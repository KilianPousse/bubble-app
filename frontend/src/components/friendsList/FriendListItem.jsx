import { useChatStore } from "../../store/useChatStore";
import Avatar from "../Avatar";
import Status from "../Status";

function FriendsListItem({ friend, index }) {
    const { setSelectedUser } = useChatStore();

    const hangleOnClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <button 
            key={index} 
            onClick={() => hangleOnClick(friend)}
            className="flex items-center gap-4 px-4 py-1.5 rounded-2xl hover:bg-slate-700/30 transition-all duration-200 cursor-pointer group w-full text-left"
        >
            <div className="relative">
                <Avatar
                    size={48} 
                    user={friend} 
                />
            </div>
            
            <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <p className="text-white font-semibold truncate">
                {friend.username?.trim() ? friend.username : `@${friend.tag}`}
                </p>
            </div>
            <Status user={friend} size={16} />
            </div>
        </button>
    );
}

export default FriendsListItem;