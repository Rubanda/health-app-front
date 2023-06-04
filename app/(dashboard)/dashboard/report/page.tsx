
import { GenerateReport } from '@/components/generate-report';
import { Card } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/session';
import { Prediction } from '@/components/prediction';
import TezosLogin from '@/components/login-tezos';

async function getTezos() {
  const res = await fetch('https://ainlife1.pythonanywhere.com/lr-xtz-prediction', { next: { revalidate: 10 } })
  const data = await res.json()
  return data
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
  const res = await user.json()
  return res
}
async function getReport(token: string, query: string) {
  'use server'
  const user = await fetch(`${process.env.BACKEND_URL}/api/user/search?attributes=["${query}"]`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  const res = await user.json()
  return res
}

export default async function GoogleMapPage() {
  const reportUrl = "reportUrl"

  const user: any = await getCurrentUser()
  const token: string = user?.token
  const userReport = await getReport(token, reportUrl)
  const tezosPrediction = await getTezos()

  return (
    <>

      <div className='mx-0 mb-3 flex flex-col items-center space-y-5 align-middle '>
        <Prediction tezosPrediction={tezosPrediction} />
        <GenerateReport token={token} reportUrl={userReport} user={user} />
      </div>
      <TezosLogin />
    </>
  )
}
