import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
const ContactsList = () => {
  const { getAllContacts, allContacts, selectedUser, isLoading } =
    useChatStore();
  // const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isLoading) return <UserLoadingSkeleton />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => selectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
            // className={`avatar ${
            //   onlineUsers.includes(contact._id) ? "online" : "offline"
            // }`}
            >
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};
export default ContactsList;
