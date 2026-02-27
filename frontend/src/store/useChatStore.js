import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isLoading: false,
  isMessageLoading: false,
  isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable") === true),

  toggleSound: () => {
    localStorage.setItem("isSoundEnable", !get().isSoundEnable);
    set({ isSoundEnable: !get().isSoundEnable });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  getChatPartners: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  getMessageByUserId: async (userId) => {
    console.log("userId :", userId);
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessageLoading: false });
    }
  },
}));
