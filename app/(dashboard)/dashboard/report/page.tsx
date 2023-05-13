
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
export async function getLocation(token: string){
  const user = await fetch(`${process.env.BACKEND_URL}/api/user//location`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
     next: { revalidate: 10 } 
  })
  const res= await user.json() 
  return res
}

export default async function GoogleMapPage() {
  const user: any = await getCurrentUser()
  const token: string = user?.token
  const userLocation = await getLocation(token)
  console.log('[location]',userLocation)
  return (
    <>
      <GenerateReport token={token} />
    </>
  )
}
