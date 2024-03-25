import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

export async function GET(): Promise<NextResponse<{ result: any }>> {
  try {
    const result = await prisma.tanka.create({
      data: {
        theme: `テストテーマ`,
        ku1: "あああああ",
        ku2: "いいいいい",
        ku3: "ううううう",
        ku4: "えええええ",
        ku5: "おおおおお",
        userId: "user-test-fa8f7a5c-1594-45f0-ada5-5d01af3d0540",
        published: true,
      },
    });

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ result: false }, { status: 500 });
  }
}
