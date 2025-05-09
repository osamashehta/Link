import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token)
    return NextResponse.json({ error: "Token not found" }, { status: 400 });
  // @ts-expect-error: TypeScript does not recognize the dynamic cookies API
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { message: "Token set successfully" },
    { status: 200 }
  );
}
