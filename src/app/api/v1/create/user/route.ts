import { User, Tanka } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@lib/prisma";

export type CreateUserData = {
  user: User | null;
  tankas: Tanka[];
};

type Identifier = { userId: string; userName: string };

export async function POST(
  req: NextRequest,
): Promise<NextResponse<CreateUserData>> {
  const { userId, userName } = (await req.json()) as Identifier;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tankas: true,
      },
    });

    // ユーザーが存在する場合はユーザー情報と短歌をへ返却する
    if (user) {
      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name,
          message: user.message,
          createdAt: user?.createdAt,
          updatedAt: user?.updatedAt,
        },
        tankas: user?.tankas || [],
      });
    }

    // ユーザー作成
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        name: userName,
        message: `こんにちは、${userName}です！`,
      },
    });

    return NextResponse.json({
      user: newUser,
      tankas: [],
    });
  } catch (error) {
    return NextResponse.json(
      { user: null, tankas: [] },
      {
        status: 500,
      },
    );
  }
}
