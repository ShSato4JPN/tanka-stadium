"use client";
import { useState, useEffect } from "react";

import { redirect } from "next/navigation";

import { GetUserData } from "@/app/api/v1/user/[id]/route";
import Profile from "@/components/Profile";

import { GetAuthData } from "../api/v1/auth/route";

// JWT トークンを使ってユーザー ID を取得します
async function getUserId(): Promise<GetAuthData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/auth`, {
    cache: "no-store",
  });

  return res.json();
}

// ユーザーの情報を取得します
async function getUserData(userId: string): Promise<GetUserData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/user/${userId}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

// ユーザーを作成します
async function createUser({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}): Promise<GetUserData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/user/create`, {
    method: "post",
    body: JSON.stringify({ userId, userName }),
    cache: "no-store",
  });

  return res.json();
}

// トランザクションを実行します
async function transaction() {
  const { userId, userName } = await getUserId();
  if (!userId) {
    new Error("user id not found");
  }

  // ユーザー情報を取得します
  let userData = await getUserData(userId);

  if (!userData.user) {
    // ユーザーが存在しない場合は新規作成します
    userData = await createUser({ userId, userName });
  }

  return userData;
}

function Page() {
  const [userData, setUserData] = useState<GetUserData | null>(null);

  useEffect(() => {
    transaction()
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {
        console.error(error);
        return redirect("/login");
      });
  }, []);

  if (userData === null) {
    return <h1>loading</h1>;
  }

  return <Profile user={userData} />;
}

export default Page;
