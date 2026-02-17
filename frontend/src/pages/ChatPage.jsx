import React from "react";
import { useAuthStore } from "../store/useAuthStore";
const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="z-10 w-full h-screen flex items-center justify-center ">
      ChatPage{" "}
      <button
        onClick={() => {
          logout();
        }}
        className="btn btn-success"
      >
        logout
      </button>
    </div>
  );
};

export default ChatPage;
