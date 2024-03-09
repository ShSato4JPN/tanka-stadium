import { useEffect } from "react";

import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

function MyPageTop() {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/");
    }
  }, [user, isInitialized, router]);

  return (
    <main>
      <h1>{JSON.stringify(user)}</h1>
    </main>
  );
}

export default MyPageTop;
