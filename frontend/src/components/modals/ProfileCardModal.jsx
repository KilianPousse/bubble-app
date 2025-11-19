import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useFriendStore } from "../../store/useFriendStore";
import { useModal } from "../../context/ModalContext"; 
import Avatar from "../Avatar";
import Status from "../Status";
import StatusDropdown from "../StatusDropdown";
import { useChatStore } from "../../store/useChatStore";

function ProfileCardModal({ user }) {
    const currentUser = user;
    const { authUser, updateStatus } = useAuthStore();
    const { removeFromFriendsList } = useFriendStore();
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const handleRemoveFriend = async ({ friendId }) => {
        await removeFromFriendsList(friendId);
        closeModal();
        closeModal();
    };

    const confirmRemoveFriend = ({ friend }) => {
        openModal("confirm", {
            title: "Remove Friend",
            message: `Are you sure you want to remove @${friend.tag} from your friends list?`,
            onConfirm: () => handleRemoveFriend({ friendId: friend._id }), 
        });
    };

    return (
        <div className="min-w-[24rem]">
            <div className="flex flex-col items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                    <Avatar size={100} user={currentUser} />
                </div>

                {/* User Info */}
                <div className="text-center space-y-3 w-full">
                    <div>
                        {currentUser.username ? (
                            <>
                                <h2 className="text-white font-bold text-xl truncate">
                                    {currentUser.username}
                                </h2>
                                <p className="text-slate-400 text-lg truncate">
                                    @{currentUser.tag}
                                </p>
                            </>
                        ) : (
                            <h2 className="text-white font-bold text-xl truncate">
                                @{currentUser.tag}
                            </h2>
                        )}
                    </div>
                        <div className="flex justify-center">   
                            {authUser?.tag === currentUser.tag ? (
                                    <StatusDropdown user={currentUser} onChangeStatus={updateStatus} />
                                ) : (
                                    <Status user={currentUser} text={true} />
                                )
                            }
                        </div>

                    <div className="pt-6 border-t border-gray-600/30 space-y-4">
                        {currentUser.bio ? (
                            <div className="text-left">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2 font-semibold">BIO</p>
                                <div className="max-h-20 overflow-y-auto pr-2 custom-scrollbar">
                                    <p className="text-white text-base break-words whitespace-pre-line">
                                        {currentUser.bio}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-left">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2 font-semibold">BIO</p>
                                <p className="text-slate-500 text-base italic">No bio yet</p>
                            </div>
                        )}

                        {currentUser.createdAt && (
                            <div className="text-left">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2 font-semibold">MEMBER SINCE</p>
                                <p className="text-white text-base">
                                    {new Date(currentUser.createdAt).toLocaleDateString('en-UK', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 w-full">
                    {authUser?.tag === currentUser.tag ? (
                        <button 
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
                            onClick={() => { 
                                closeModal();
                                navigate("/settings/user");
                            }}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button 
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
                            onClick={() => confirmRemoveFriend({ friend: currentUser })}
                        >
                            Remove Friend
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileCardModal;
