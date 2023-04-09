import { Inter } from 'next/font/google'
import GridCard from './component/card';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
const inter = Inter({ subsets: ['latin'] })
declare global {
  interface Window { ethereum: any; }
}
export type UserDocument = {
  id: number
  name: string
  username: string
  email: string
  password: string
  mqtt_server: string
  phone: string
  address: string
  date_of_birth: any
  blood_group: string
  gender: string
  avatar: string
  height: number
  weight: number
  metaMaskAddress: string
  created_at: string
  updated_at: string
  devices: {
    id: number,
    name: string,
    description: string,
    userId: 1,
    mqttServerDeviceId: string,
    type: string,
    status: true,
    createdAt: string,
    updatedAt: string,
  }[]
  vital: {
    id: number,
    userId: number,
    deviceId: number,
    type: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  }[]
}
export async function getData(token: string) {
  const user = await fetch("https://health.masatafit.com/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    cache: 'no-store'
  })
  const res= await user.json() as UserDocument
  return res
}

export default async function Home() {
  const session: any = await getServerSession(authOptions)
  const token: string = session?.user?.token
  const data= await getData(token)

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

        <h1 className='text-3xl font-bold py-6 text-gray-800'>WELCOME {data?.name}</h1>

      </div>
      <GridCard data={data} />
    </main>
  )
}
