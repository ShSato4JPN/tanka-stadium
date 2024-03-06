"use client";

import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Login from "@/components/Login";

export default function Page() {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/my-page");
    }
  }, [user, isInitialized, router]);

  return <Login />;
}
