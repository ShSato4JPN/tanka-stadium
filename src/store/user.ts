import { User } from "@prisma/client";
import { create } from "zustand";

import { CustomTanka } from "@/types";

export type UserStoreState = {
  userStore: {
    user: User;
    tankas: CustomTanka[];
  };
};

type Action = {
  saveUserStore: (userData: UserStoreState["userStore"]) => void;
};

export const useUserStore = create<UserStoreState & Action>((set) => ({
  userStore: {
    user: {
      id: "",
      name: "",
      message: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    tankas: [],
  },
  saveUserStore: (data) => set({ userStore: data }),
}));
