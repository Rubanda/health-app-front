import { Inter } from 'next/font/google'
import GridCard from '../../../component/card';
import MyComponents from '../../../component/google-map';
import { getCurrentUser } from '@/lib/session';
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import MyDocument from '@/component/pdf';
import Toast from '@/component/toast';
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
  vitals: {
    id: number,
    userId: number,
    deviceId: number,
    type: string,
    payload: string,
    createdAt: string,
    updatedAt: string,
  }[]
  latest_location: {
    id: number,
    name: string,
    payload:{lat:string,lng:string},
    userId: number,
    createdAt: string,
    updatedAt: string,
  }[]
}
async function getData(token: string) {
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
  const user: any = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
 
  const token: string = user?.token
  console.log('[token/]....', token)
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

        <div>
      </div>
      </div>
      <GridCard data={data} token={token} />
      {/* <Toast /> */}

      {/* <MyComponents /> */}
      {/* <MyDocument /> */}
      
    </main>
  )
}
