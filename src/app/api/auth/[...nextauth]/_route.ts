import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)
console.log('\n----------------------\n')
console.log('[api[]]', handler)
console.log('\n----------------------\n')
export { handler as GET, handler as POST }
