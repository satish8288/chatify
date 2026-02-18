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
  isSoundEnable: localStorage.getItem("isSoundEnable") === "true",

  toggleSound: () => {
    localStorage.setItem("isSoundEnable", !get().isSoundEnable);
    set({ isSoundEnable: !get().isSoundEnable });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  getAllContacts: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isLoading: false });
    }
  },

  getChatPartners: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
