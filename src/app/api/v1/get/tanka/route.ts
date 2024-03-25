import { NextResponse } from "next/server";

import { CustomTanka } from "@/types";
import prisma from "@lib/prisma";

export type GetTankasData = {
  count: number;
  tankas: CustomTanka[];
};

export async function GET(req: Request): Promise<NextResponse<GetTankasData>> {
  const { searchParams } = new URL(req.url);

  try {
    const count = await prisma.tanka.count();
    const tankas = await prisma.tanka.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      skip: Number(searchParams.get("skip")) || 0,
      take: Number(searchParams.get("take")) || 0,
      orderBy: {
        createdAt: "asc",
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
