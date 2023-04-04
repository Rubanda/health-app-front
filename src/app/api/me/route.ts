import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";
const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: any) {
    const token = await getToken({ req, secret })
    const response = await fetch(
      "http://localhost:4000/api/user/me",
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token?.token,
        },
      }
    );
    const profile = await response.json();

    console.log('\n[profile]');
    console.log('\t[v]', profile);
    return NextResponse.json({ profile })
  }
  