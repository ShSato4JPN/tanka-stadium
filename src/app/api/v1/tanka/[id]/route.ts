import { Tanka } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

export type GetTankaData = {
  tanka: Tanka | null;
};

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
): Promise<NextResponse<GetTankaData>> {
  try {
    const tanka = await prisma.tanka.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!tanka) {
      return NextResponse.json(
        {
          tanka: null,
        },
        {
          status: 204,
        },
      );
    }

    return NextResponse.json({ tanka });
  } catch (error) {
    return NextResponse.json(
      { tanka: null },
      {
        status: 500,
      },
    );
  }
}
