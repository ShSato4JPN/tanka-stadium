import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

type DeleteInfoData = {
  status: "success" | "error";
  id: string;
};

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
): Promise<NextResponse<DeleteInfoData>> {
  try {
    console.log(params);
    await prisma.tanka.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      status: "success",
      id: params.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        id: params.id,
      },
      {
        status: 500,
      },
    );
  }
}
