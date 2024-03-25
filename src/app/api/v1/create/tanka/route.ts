import { NextRequest, NextResponse } from "next/server";

import prisma from "@lib/prisma";

type RequestData = {
  userId: string;
  theme: string;
  ku1: string;
  ku2: string;
  ku3: string;
  ku4: string;
  ku5: string;
};

export async function POST(
  req: NextRequest,
): Promise<NextResponse<{ result: boolean }>> {
  const { userId, theme, ku1, ku2, ku3, ku4, ku5 } =
    (await req.json()) as RequestData;

  if ([userId, theme, ku1, ku2, ku3, ku4, ku5].every((v) => v === undefined)) {
    return NextResponse.json({ result: false }, { status: 400 });
  }

  try {
    await prisma.tanka.create({
      data: {
        theme,
        ku1,
        ku2,
        ku3,
        ku4,
        ku5,
        userId,
        published: true,
      },
    });

    return NextResponse.json({ result: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ result: false }, { status: 500 });
  }
}
