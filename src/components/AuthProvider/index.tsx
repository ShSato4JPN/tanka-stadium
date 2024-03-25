"use client";
import { useEffect, useCallback } from "react";

import { User } from "@prisma/client";
import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

import { GetUserData } from "@/app/api/v1/get/user/[id]/route";
import Loading from "@/components/Loading";
import { useUserStore } from "@/store/user";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();
  const { saveUserStore } = useUserStore();

  // ユーザーの情報を取得
  const getUserData = useCallback(
    async (userId: string): Promise<GetUserData> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/get/user/${userId}`,
        {
          cache: "no-store",
        },
      );

      return res.json();
    },
    [],
  );

  // ユーザーを作成
  const createUser = useCallback<
    (params: { userId: string; userName: string }) => Promise<GetUserData>
  >(async ({ userId, userName }: { userId: string; userName: string }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/create/user`,
      {
        method: "post",
        body: JSON.stringify({ userId, userName }),
        cache: "no-store",
      },
    );

    return res.json();
  }, []);

  // トランザクションを実行
  const transaction = useCallback(
    async ({ userId, userName }: { userId: string; userName: string }) => {
      // ユーザー情報を取得
      let userData = await getUserData(userId);
      if (!userData.user) {
        // ユーザーが存在しない場合は新規作成
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
          /**
           * ストアにユーザー情報を保存する。
           * AuthProvider　以下のコンポーネントは
           */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isInitialized]);

  // ユーザー情報取得後はストアの情報をもとにログイン判定を行う
  return user ? children : <Loading />;
}

export default AuthProvider;
