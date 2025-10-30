import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { useFriendStore } from '../store/useFriendStore';

import PageTitle from "../components/TitlePage";
import ProfileBox from "../components/ProfileBox";
import ProfileCard from "../components/ProfileCard";
import TabSwitch from '../components/TabSwitch';
import FriendsList from '../components/FriendsList';
import GroupsList from '../components/GroupsLIst';
import AddFriendModal from '../components/AddFriendModal';

function ChatPage() {
    const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
    const { authUser } = useAuthStore();
    const { activeTab } = useChatStore();
    const { isAddFriendModalOpen, closeAddFriendModal } = useFriendStore();

    const handleProfileOpen = () => {
        setIsProfileCardOpen(true);
    };

    const handleProfileClose = () => {
        setIsProfileCardOpen(false);
    };

    return (
        <div className="relative w-full h-full">
            <PageTitle title="Chat" />

            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-96 bg-slate-800/60 backdrop-blur-lg overflow-y-auto flex flex-col shadow-2xl">
                <ProfileBox onProfileClick={handleProfileOpen} />
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
                
            </main>


            {/* Modal Add Friend */}
            {isAddFriendModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
                    onClick={handleProfileClose}
                >
                    <AddFriendModal onClose={closeAddFriendModal} />
                </div>
            )}

            {/* Profile Card */}
            {isProfileCardOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
                    onClick={handleProfileClose}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <ProfileCard user={authUser} onClose={handleProfileClose} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatPage;
