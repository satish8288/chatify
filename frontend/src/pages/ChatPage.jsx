import React from "react";
import { useChatStore } from "../store/useChatStore";
import BorderAnimation from "../components/BorderAnimation";
import ProfileHeader from "../components/ProfileHeader";
import ProfileHeaderSkeleton from "../components/ProfileHeaderSkeleton";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactsList from "../components/ContactsList";
import ChatContainer from "../components/ChatContainer";
import NoConversationContainer from "../components/NoConversationContainer";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { isLoading } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimation>
        {/* Left Container */}
        <div className="flex flex-col w-80 backdrop-blur-sm bg-slate-800/50">
          {isLoading ? <ProfileHeaderSkeleton /> : <ProfileHeader />}
          <ActiveTabSwitch />
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactsList />}
          </div>
        </div>

        {/* Right Container*/}
        <div className="flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationContainer />}
        </div>
      </BorderAnimation>
    </div>
  );
};

export default ChatPage;
