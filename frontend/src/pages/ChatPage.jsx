import PageTitle from "../components/TitlePage";

import ProfileBox from "../components/ProfileBox";

function ChatPage() {
    return (
        <div className="relative w-full h-full">
            <PageTitle title="Chat" />

            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-96 bg-slate-800/60 backdrop-blur-lg overflow-y-auto flex flex-col shadow-2xl">
                <ProfileBox />
            </aside>
        </div>
    );
}
export default ChatPage;
