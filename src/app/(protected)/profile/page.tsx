"use client";

import Profile from "@/components/Profile";
import SwrConfig from "@/components/SwrConfig";
import { useUserStore } from "@/store/user";

function Page() {
  const { userStore } = useUserStore();

  return (
    <SwrConfig value={{ fallbackData: [userStore] }}>
      <Profile userId={userStore.user.id} />
    </SwrConfig>
  );
}

export default Page;
