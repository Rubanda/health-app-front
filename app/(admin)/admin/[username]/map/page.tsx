
import LocationAdmin from '@/components/google-map-admin';
import { getCurrentUser } from '@/lib/session';

async function getAdminUserLocation(token: string, userId: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/user/admin/user/locaction/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            cache: 'no-store'
        })
    const userLocation = await res.json()

    return userLocation
}
export default async function GoogleMapPage() {
  const user: any = await getCurrentUser()
  const token: string = user?.token
  const userLocation = await getAdminUserLocation(token, user?.id)
  return (
    <>
      <LocationAdmin location={userLocation} /> 

    </>
  )
}
