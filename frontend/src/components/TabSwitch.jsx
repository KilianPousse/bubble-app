import { useChatStore } from '../store/useChatStore';

function TabSwitch() {
    const { activeTab, setActiveTab } = useChatStore();

    return (
        <div className="border-b border-gray-600/30 backdrop-blur-sm">
            <div className="flex bg-slate-800/60 backdrop-blur-sm p-1.5">
                <button
                    className={`flex-1 py-1.5 px-4 rounded-xl transition-all duration-300 font-medium ${
                        activeTab === "friends" 
                            ? "bg-sky-500/20 text-sky-400"
                            : "text-slate-300 hover:bg-slate-600/30 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("friends")}
                >
                    Friends
                </button>

                <div className="w-px bg-slate-600/50 my-2 mx-3"></div>

                <button
                    className={`flex-1 py-1.5 px-4 rounded-xl transition-all duration-300 font-medium ${
                        activeTab === "groups" 
                            ? "bg-sky-500/20 text-sky-400"
                            : "text-slate-300 hover:bg-slate-600/30 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("groups")}
                >
                    Groups
                </button>
            </div>
        </div>
    );
}

export default TabSwitch;