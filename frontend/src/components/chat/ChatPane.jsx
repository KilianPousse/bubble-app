import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";

function ChatPane() {

    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Chat Header */}
            <ChatHeader />

            {/* Chat Main Content */}
            <ChatMain />
        </div>
    );
};

export default ChatPane;