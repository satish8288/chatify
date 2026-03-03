import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const baseURL =
  import.meta.env.MODE == "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true, error: null });

      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, error: null });
      get().connectSocket();
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ error: "Auth failed" });
      set({ authUser: null, error: "Auth failed" });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggedIn: true });

      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully!");
      get().connectSocket();
    } catch (error) {
      console.error("Error in login:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoggedIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("Logged out error", error);
      toast.error("Error in logging out");
    }
  },

  updateProfile: async (data) => {
    console.log("hello");
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put("auth/update-profile", data);
      console.log(res);

      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in update profile: ", error);
      toast.error(error.res.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  connectSocket: () => {
    console.log("connectSocket");
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(baseURL, { withCredentials: true });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    console.log("disconnectSocket");
    if (get().socket?.connected) get().socket.disconnect();
    set({ socket: null });
  },
}));
