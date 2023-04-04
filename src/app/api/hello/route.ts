import { cookies } from 'next/headers';

export async function GET(request: Request) {

  return new Response('Hello, Next.js!')
}
