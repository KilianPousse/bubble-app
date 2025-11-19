import { useAuthStore } from "../../store/useAuthStore";


function BubbleChat({ msg, user }) {
    const { authUser } = useAuthStore();

    return (
        <div
        key={msg._id}
        className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
        >
        <div
            className={`chat-bubble relative ${
            msg.senderId === authUser._id
                ? "bg-sky-500 text-white"
                : "bg-blue-600 text-slate-200"
            }`}
        >
            {msg.image && (
            <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
            )}
            {msg.text && <p className="mt-2">{msg.text}</p>}
            <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
            {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
            })}
            </p>
        </div>
        </div>
    );

};
export default BubbleChat;