import { User } from "@prisma/client";
import { NextResponse } from "next/server";

import { CustomTanka } from "@/types";
import prisma from "@lib/prisma";

export type GetUserData = {
  user: Pick<User, "id" | "name" | "message"> | null;
  tankas: CustomTanka[];
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
    });
    const tankas = await prisma.tanka.findMany({
      where: {
        userId: params.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
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
      tankas,
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
