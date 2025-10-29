import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { SettingsIcon, LogoutIcon } from "./icons";

function ProfileBox({ onProfileClick }) {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleProfile = (e) => {
        e.preventDefault();
        if (onProfileClick) {
            onProfileClick();
        }
    };

    return (
        <div className="border-b border-gray-600/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex p-4 items-center gap-4 w-full">
                    <button 
                        className="flex items-center gap-4 w-full flex-1 min-w-0 hover:bg-blue-500/20 transition-all duration-200 rounded-xl p-2 -ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 group"
                        onClick={handleProfile}
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full blur-sm scale-110"></div>
                            <div className="relative">
                                <Avatar size={50} user={authUser} />
                            </div>
                        </div>

                        {/* Username & Tag & Online */}
                        <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-2">
                                {authUser.username ? (
                                    <>
                                        <h3 className="text-white font-semibold text-lg truncate">
                                            {authUser.username}
                                            <span className="text-slate-400 text-xl"> • </span>
                                            <span className="text-slate-400 text-sm"> @{authUser.tag}</span>
                                        </h3>
                                    </>
                                ) : (
                                    <h3 className="text-slate-400 font-medium text-sm truncate">
                                        @{authUser.tag}
                                    </h3>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <p className="text-green-400 text-xs font-medium">Online</p>
                            </div>
                        </div>
                    </button>

                    {/* Buttons */}
                    <div className="flex gap-1 items-center">
                        {/* Settings */}
                        <button 
                            className="text-slate-300 hover:text-white hover:bg-blue-500/20 transition-all duration-200 p-2 rounded-xl"
                            onClick={() => navigate("/settings")}
                        >
                            <SettingsIcon size={22} />
                        </button>

                        {/* Logout */}
                        <button 
                            className="text-red-600 hover:text-red-700 hover:bg-red-500/20 transition-all duration-200 p-2 rounded-xl"
                            onClick={logout}
                        >
                            <LogoutIcon size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileBox;