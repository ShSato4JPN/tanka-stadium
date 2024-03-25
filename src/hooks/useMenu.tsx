"use client";

import { useUserStore } from "@/store/user";

function useMenu() {
  const { userStore } = useUserStore();

  // Store を見てログイン情報を確認する
  if (userStore.user.id) {
    return [
      {
        name: "マイページ",
        path: "/profile",
      },
      {
        name: "短歌を作る",
        path: "/create",
      },
      {
        name: "短歌を見る",
        path: "/entries",
      },
    ];
  } else {
    return [
      {
        name: "短歌を見る",
        path: "/public/entries",
      },
      {
        name: "ログイン",
        path: "/login",
      },
    ];
  }
}

export default useMenu;
