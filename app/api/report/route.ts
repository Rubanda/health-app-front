import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";
const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: any) {
    const token = await getToken({ req, secret })
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user/pdf`,
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token?.token,
        },
      }
    );
    const report = await response.json();
    return NextResponse.json({ report })
  }
  