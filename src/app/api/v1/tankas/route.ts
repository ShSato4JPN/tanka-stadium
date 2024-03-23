import { Tanka } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

export type GetTankasData = {
  count: number;
  tankas: Tanka[];
};

export async function GET(req: Request): Promise<NextResponse<GetTankasData>> {
  const { searchParams } = new URL(req.url);

  try {
    const count = await prisma.tanka.count();
    const tankas = await prisma.tanka.findMany({
      skip: Number(searchParams.get("skip")) || 0,
      take: Number(searchParams.get("take")) || 0,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ count, tankas });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { count: 0, tankas: [] },
      {
        status: 500,
      },
    );
  }
}
