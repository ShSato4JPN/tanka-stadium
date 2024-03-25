import { NextRequest, NextResponse } from "next/server";

import prisma from "@lib/prisma";

type Identifier = { id: string; name: string; message: string };

type UpdateInfoData = {
  status: "success" | "error";
  id: string;
};

export async function POST(
  req: NextRequest,
): Promise<NextResponse<UpdateInfoData>> {
  const { id, name, message } = (await req.json()) as Identifier;

  console.log(id, name, message);

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        message,
      },
    });

    return NextResponse.json({
      status: "success",
      id,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      id,
    });
  }
}
