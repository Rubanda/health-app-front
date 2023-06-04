import { Inter } from 'next/font/google'
import GridCard from '../../../components/card';
import { getCurrentUser } from '@/lib/session';
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

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
  tezos_address: string
  hashEdTransaction: string
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
    payload: { lat: string, lng: string },
    userId: number,
    createdAt: string,
    updatedAt: string,
  }[]
}
async function getData(token: string) {
  const user = await fetch(`${process.env.BACKEND_URL}/api/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    next: { revalidate: 10 }
  })
  const res = await user.json() as UserDocument
  return res
}

export default async function Home() {
  const user: any = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const token: string = user?.token
  const data = await getData(token)
  return (
    <>
      <div className='flex flex-col '>
        <h1 className='text-3xl font-bold py-6 text-gray-800'>WELCOME {data?.name}</h1>

        <div>
        </div>
      </div>
      <GridCard data={data} token={token} />
    </>
  )
}
