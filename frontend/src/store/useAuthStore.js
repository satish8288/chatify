import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });

      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth check: ", error);

      set({ error: "Auth failed" });

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error in signup:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
