import { Tanka } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

export type GetTankasData = {
  tankas: Tanka[];
};

export async function GET(req: Request): Promise<NextResponse<GetTankasData>> {
  const { searchParams } = new URL(req.url);

  try {
    const tankas = await prisma.tanka.findMany({
      skip: Number(searchParams.get("skip")) || 0,
      take: Number(searchParams.get("take")) || 0,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ tankas });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { tankas: [] },
      {
        status: 500,
      },
    );
  }
}
