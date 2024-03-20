import { User, Tanka } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

export type GetUserData = {
  user: Pick<User, "id" | "name" | "message"> | null;
  tankas: Tanka[];
};

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
): Promise<NextResponse<GetUserData>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        tankas: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          user: null,
          tankas: [],
        },
        {
          status: 204,
        },
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        message: user.message,
      },
      tankas: user?.tankas || [],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { user: null, tankas: [] },
      {
        status: 500,
      },
    );
  }
}
