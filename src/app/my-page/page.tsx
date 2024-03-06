"use client";

import { useEffect } from "react";

import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

import MyPage from "@/components/MyPage";

export default function Page() {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/");
    }
  }, [user, isInitialized, router]);

  return <MyPage />;
}
