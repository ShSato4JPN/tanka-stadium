"use client";
import { useEffect, useCallback } from "react";

import { User } from "@prisma/client";
import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

import { GetUserData } from "@/app/api/v1/user/[id]/route";
import { useUserStore } from "@/store/user";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { userStore, saveUserStore } = useUserStore();
  const { user, isInitialized } = useStytchUser();

  // ユーザーの情報を取得します
  const getUserData = useCallback(
    async (userId: string): Promise<GetUserData> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/user/${userId}`,
        {
          cache: "no-store",
        },
      );

      return res.json();
    },
    [],
  );

  // ユーザーを作成します
  const createUser = useCallback<
    (params: { userId: string; userName: string }) => Promise<GetUserData>
  >(async ({ userId, userName }: { userId: string; userName: string }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/user/create`,
      {
        method: "post",
        body: JSON.stringify({ userId, userName }),
        cache: "no-store",
      },
    );

    return res.json();
  }, []);

  // トランザクションを実行します
  const transaction = useCallback(
    async ({ userId, userName }: { userId: string; userName: string }) => {
      // ユーザー情報を取得します
      let userData = await getUserData(userId);
      if (!userData.user) {
        // ユーザーが存在しない場合は新規作成します
        userData = await createUser({ userId, userName });
      }

      return userData;
    },
    [createUser, getUserData],
  );

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }

    if (user) {
      transaction({ userId: user.user_id, userName: user.name.first_name })
        .then((userData) => {
          saveUserStore({
            user: userData.user as User,
            tankas: userData.tankas,
          });
        })
        .catch((error) => {
          console.error(error);
          router.replace("/login");
        });
    }
  }, [isInitialized, router, saveUserStore, transaction, user]);

  if (userStore.user === null) {
    return <h1>loading</h1>;
  }

  return children;
}

export default AuthProvider;
