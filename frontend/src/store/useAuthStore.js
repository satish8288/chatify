import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: {
    name: "satish",
    _id: 123,
    age: 21,
  },
  isLoggedIn: false,
  login: () => {
    set({ isLoggedIn: true });
  },
}));
