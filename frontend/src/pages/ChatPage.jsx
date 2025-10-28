import PageTitle from "../components/TitlePage";
import { useAuthStore } from "../store/useAuthStore";


function ChatPage() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <div className="p-4">
            <PageTitle title="Chat" />
            <h1 className="text-white text-2xl mb-4">Chat Page</h1>
            <button 
                onClick={logout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
}
export default ChatPage;
