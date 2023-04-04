import { Inter } from 'next/font/google'
import GridCard from './component/card';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
const inter = Inter({ subsets: ['latin'] })
declare global {
  interface Window { ethereum: any; }
}

export async function getData(token: string) {
  const user = await fetch("http://localhost:4000/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  const res = await user.json()
  return [res]
}

export default async function Home() {
  const session: any = await getServerSession(authOptions)
  const token: string = session?.user?.token
  const data = await getData(token)
  // console.log('\n[data]...')
  // console.log('\t[v]', data)

  return (
    <main className="mx-auto max-w-7xl px-4 mt-5 sm:px-6 lg:px-8">

      {/* {metaMask ? (
            <button className='relative m-0 p-3 px-4 bg-opacity-50 bg-gray-300 border border-gray-400 rounded-lg'>
              {metaMask?.slice(0, 6) + '...' + metaMask.slice(-4)}
              <span className='absolute top-0 right-0 mt-3 ml-2 w-3 h-3 rounded-full bg-green-500'></span>
            </button>
          )
            : (<button className='m-0 p-3 px-4 bg-opacity-50 bg-gray-300 border border-gray-400 rounded-lg' onClick={loginMetaMask}>Connect Wallet</button>)
          } */}
      <div className='flex flex-col '>

        <h1 className='text-3xl font-bold py-6 text-gray-800'>WELCOME {data[0]?.name}</h1>

      </div>
      <GridCard data={data[0]} />
    </main>
  )
}
