import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET

export default async function fetchUser(req:any) {
const token = await getToken({ req, secret })
const response = await fetch(
  "https://health.masatafit.com/api/user/me",
  {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token?.token,
    },
  }
);
const profile = await response.json();
return profile
}