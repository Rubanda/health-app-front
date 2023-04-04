// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
const secret = process.env.NEXTAUTH_SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  if (token) {
    // Signed in
    res.status(200).json(token)
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}