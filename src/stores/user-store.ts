import { create } from "zustand";

type UserStore = {
  name: string;
  token: string | null;
};
export const userStore = create((set) => ({
  user: {
    name: "osama",
    token: null,
  },
  setUser: (user: UserStore) => set({ ...user, token: user.token || null }),
}));
