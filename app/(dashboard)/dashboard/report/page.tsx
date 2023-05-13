
import { GenerateReport } from '@/components/generate-report';
import { getCurrentUser } from '@/lib/session';

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
export async function getReport(token: string,query:string){
  const user = await fetch(`${process.env.BACKEND_URL}/api/user/search?attributes=["${query}"]`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  const res= await user.json() 
  return res
}

export default async function GoogleMapPage() {
  const reportUrl = "reportUrl"
  const user: any = await getCurrentUser()
  const token: string = user?.token
  const userReport = await getReport(token,reportUrl)
  return (
    <>
      <GenerateReport token={token} reportUrl={userReport} />
    </>
  )
}
