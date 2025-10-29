import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Avatar from "./Avatar";

function ProfileCard({ user, onClose }) {
    const currentUser = user;
    const { authUser } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-96 mx-4">
            <div className="flex justify-end mb-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="text-red-600 hover:text-red-700 hover:bg-red-600/20 border border-red-600 transition-all duration-200 p-2 rounded-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            {/* Profile Content */}
            <div className="flex flex-col items-center gap-6">
                {/* Avatar with status */}
                <div className="relative">
                    <Avatar size={100} user={currentUser} />
                    <div className="absolute -bottom-2 -right-2">
                        <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-gray-800"></div>
                    </div>
                </div>

                {/* User information */}
                <div className="text-center space-y-3 w-full">
                    {/* Name & Tag */}
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

                    {/* Online status */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-green-400 text-base font-medium">Online</p>
                    </div>

                    {/* Additional information */}
                    <div className="pt-6 border-t border-gray-600/30 space-y-4">
                        {/* Bio */}
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

                        {/* Date of creation */}
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
                    {
                        authUser?.id === currentUser.id ?
                        (
                            <button 
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
                                onClick={() => navigate("/settings/user")}
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <button 
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-70"
                            >
                                Send Message
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;