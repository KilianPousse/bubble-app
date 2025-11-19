import { useChatStore } from '../../store/useChatStore';
import Avatar from '../Avatar';
import { useModal } from '../../context/ModalContext';
import Status from '../Status';

function ChatHeader() {
    const { selectedUser } = useChatStore();
    const { openModal } = useModal();

    const handleOnClick = () => {
        if(selectedUser) {
            openModal('profile-card', { user: selectedUser });
        }
    };

    return (
        <div 
            className="sticky top-0 z-10 h-[100px] bg-slate-800/90
                    flex items-center justify-between p-6 transition-all duration-200 
                    w-full text-left border-b border-gray-600/30 shadow-lg"
        >
            {selectedUser ? (
                <>
                    <div 
                        className="relative cursor-pointer flex items-center gap-4 w-full
                                    hover:bg-white/10 p-3 rounded-xl transition-all duration-300"
                        onClick={handleOnClick}
                    >
                        <Avatar size={56} user={selectedUser} />

                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold truncate text-xl drop-shadow-sm">
                                {selectedUser.username?.trim() ? selectedUser.username : `@${selectedUser.tag}`}
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                                <Status user={selectedUser} text={true} size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Other action */}
                    <div className="flex items-center gap-3 ml-4">
                        {/* Additional action buttons can be added here */}
                    </div>
                </>
            ) : (
                <div className="relative flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300">
                    <Avatar size={56} />
                </div>
            )}
            
        </div>
    );
}

export default ChatHeader;