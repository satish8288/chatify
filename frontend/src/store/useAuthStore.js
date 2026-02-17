import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isloggedIn: false,
  error: null,
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true, error: null });

      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, error: null });
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ error: "Auth failed" });
      set({ authUser: null, error: "Auth failed" });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    try {
      set({ isloggedIn: true });

      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error in login:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isloggedIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Logged out error", error);
      toast.error("Error in logging out");
    }
  },
}));
