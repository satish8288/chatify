import React from "react";
import { useChatStore } from "../store/useChatStore";
import BorderAnimation from "../components/BorderAnimation";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactsList from "../components/ContactsList";
import ChatContainer from "../components/ChatContainer";
import NoConversationConatiner from "../components/NoConversationConatiner";
const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimation>
        {/* Left Container */}
        <div className="flex flex-col w-60 backdrop-blur-sm bg-slate-800/50">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactsList />}
          </div>
        </div>

        {/* Right Container*/}
        <div className="flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationConatiner />}
        </div>
      </BorderAnimation>
    </div>
  );
};

export default ChatPage;
