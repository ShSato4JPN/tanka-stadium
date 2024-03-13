import { NextResponse } from "next/server";

import loadStytch from "@lib/loadStytch";

export type GetAuthStatus = {
  userId: string;
};

export async function GET(req: Request): Promise<NextResponse<GetAuthStatus>> {
  try {
    //  認証情報を取得
    const stytchClient = loadStytch();
    const val = req.headers.get("cookie");
    const jwt = val?.split("stytch_session_jwt=")[1].split(";")[0];

    // 取得した認証情報を使って user_id を取得する
    const data = await stytchClient.sessions.authenticateJwt({
      session_jwt: jwt || "",
    });

    return NextResponse.json({
      userId: data.session.user_id,
    });
  } catch (error) {
    return NextResponse.json(
      { userId: "" },
      {
        status: 500,
      },
    );
  }
}
