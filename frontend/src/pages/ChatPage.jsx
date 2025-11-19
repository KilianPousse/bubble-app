import { useChatStore } from '../store/useChatStore';

import PageTitle from "../components/TitlePage";
import ProfileBox from "../components/ProfileBox";
import TabSwitch from '../components/TabSwitch';
import FriendsList from '../components/friendsList/FriendsList';
import GroupsList from '../components/GroupsLIst';
import ChatPane from '../components/chat/ChatPane';

function ChatPage() {
    const { activeTab } = useChatStore();

    return (
        <div className="relative w-full h-full">
            <PageTitle title="Chat" />

            {/* Sidebar */}
            <aside className="fixed z-20 top-0 left-0 h-screen w-96 bg-slate-800/60 backdrop-blur-lg border-r border-gray-600/30 overflow-y-auto flex flex-col shadow-2xl">
                <ProfileBox />
                <TabSwitch />

                <div>
                    {
                        activeTab === "friends" 
                        ? <FriendsList />
                        : <GroupsList />
                    }
                </div>
            </aside>

            {/* Main content */}
            <main className="ml-96 h-full">
                <ChatPane />
            </main>
        </div>
    );
}

export default ChatPage;
