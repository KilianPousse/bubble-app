import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

function Status({ user = { status: "offline", _id: null }, size = 24 }) {
  const allOnlineUsers = useUserStore((state) => state.allOnlineUsers);
  const getAllOnlineUsers = useUserStore((state) => state.getAllOnlineUsers);

  // Fetch online users only if the list is empty
  useEffect(() => {
    if (!allOnlineUsers.length) {
      getAllOnlineUsers();
    }
  }, [allOnlineUsers.length, getAllOnlineUsers]);

  // Determine status based on presence in allOnlineUsers
  const isOnline = user._id && allOnlineUsers.includes(user._id);
  const status = isOnline ? user.status : "offline";

  const statusInfo = {
    online: { color: "green-400", label: "Online", pulse: true },
    offline: { color: "gray-500", label: "Offline", pulse: false },
    busy: { color: "red-400", label: "Busy", pulse: false },
  };

  const { color, label, pulse } = statusInfo[status] || statusInfo.offline;

  const dotSize = `${size / 2}px`;
  const textSize = size < 20 ? "text-sm" : size < 32 ? "text-base" : "text-lg";
  const gapSize = `${size / 2.7}px`;

  return (
    <div className="flex items-center" style={{ gap: gapSize }}>
      <div
        className={`
          rounded-full
          ${pulse ? "animate-pulse" : ""}
          ${color === "green-400" ? "bg-green-400" : color === "gray-500" ? "bg-gray-500" : "bg-red-400"}
        `}
        style={{ width: dotSize, height: dotSize }}
      ></div>

      <p
        className={`
          ${color === "green-400" ? "text-green-400" : color === "gray-500" ? "text-gray-500" : "text-red-400"}
          font-medium
          ${textSize}
        `}
      >
        {label}
      </p>
    </div>
  );
}

export default Status;
