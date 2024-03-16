"use client";

import { useEffect } from "react";

import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

import Login from "@/components/Login";

export default function Page() {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();
  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/profile");
    }
  }, [user, isInitialized, router]);

  return <Login />;
}
