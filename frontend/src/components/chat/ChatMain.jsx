import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { m } from "framer-motion";
import BubbleChat from "./BubbleChat";

function ChatMain() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if(!selectedUser) return;
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("messages:", messages);
  }, [messages]);

  return (
    <>
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6 w-full">
            {messages.map((msg) => (
              <BubbleChat key={msg._id} msg={msg} />
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <div className="loading" />
        ) : (
          <p>no chat</p> 
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatMain;