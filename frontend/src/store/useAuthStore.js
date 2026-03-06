import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const baseURL =
  import.meta.env.MODE == "development"
    ? "http://localhost:3000"
    : "https://chatify-backend-4oyh.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  socket: null,
  onlineUsers: [],

  // check Auth
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

  // signup
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

  // login
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

  //logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      get().disconnectSocket();
      set({ authUser: null });
    } catch (error) {
      console.log("Logged out error", error);
      toast.error("Error in logging out");
    }
  },

  //updateProfile
  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put("auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in update profile: ", error);
      toast.error(error.res.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // connect socket
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(baseURL, { withCredentials: true, autoConnect: false });

    socket.connect();
    set({ socket });
    console.log("socket:", socket);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // disconnect socket
  disconnectSocket: () => {
    const socket = get().socket;

    if (!socket) {
      set({ socket: null, onlineUsers: [] });
      return;
    }
    socket.off("newMessage");
    socket.off("getOnlineUsers");
    socket.disconnect();
    set({ socket: null, onlineUsers: [] });
  },
}));
