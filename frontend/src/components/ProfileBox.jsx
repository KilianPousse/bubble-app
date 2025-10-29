import { useAuthStore } from "../store/useAuthStore";
import Avatar from "./Avatar";
import { SettingsIcon, LogoutIcon } from "./icons";

function ProfileBox() {
    const { authUser, logout } = useAuthStore();

    return (
        <div className="border-b border-gray-600/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex p-4 items-center gap-4 w-full">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="absolute inset-0  rounded-full blur-sm scale-110"></div>
                            <Avatar size={50} user={authUser} />
                        </div>

                    {/* Username & Tag & Online */}
                    <div className="flex-1 min-w-0">
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

                    {/* Buttons */}
                    <div className="flex gap-1 items-center">
                        {/* Settings */}
                        <button 
                            className="text-slate-300 hover:text-white hover:bg-blue-500/20 transition-all duration-200 p-2 rounded-xl border border-transparent hover:border-blue-500/30"
                            onClick={() => (window.location.href = '/settings')}
                        >
                            <SettingsIcon size={22} />
                        </button>

                        {/* Logout */}
                        <button 
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200 p-2 rounded-xl border border-transparent hover:border-red-500/30"
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