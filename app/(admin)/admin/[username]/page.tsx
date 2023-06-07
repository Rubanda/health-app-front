import { DataCard } from "@/components/cards/data-card"
import { DeviceCard } from "@/components/cards/device-card"
import { SimpleCard } from "@/components/cards/simpleCard"
import UserCard from "@/components/cards/user-card"
import { Card } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
interface Props {
    params: { username: string,patientName: string }
}

async function getAdminUser(token: string, username: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/user/admin/user?username=${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            cache: 'no-store'
        })
    const userData = await res.json()
    return userData
}
async function getCpanelUser(token: string, patientname: string) {
        const  res = await fetch(`${process.env.BACKEND_URL}/api/user/cpanel/search?searchName=${patientname}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            cache: 'no-store'
        })
    const userCpanelData = await res.json()
    return userCpanelData
}


const UserAdmin = async ({ params }: Props) => {
    const {username} = params
    const user: any = await getCurrentUser()
    // if not admin redirect to dashboard
    if (!user?.role.includes('SuperAdmin') || !user?.role.includes('doctor')) {
        redirect('/dashboard')

    }
    const token: string = user?.token
    const userData = await getAdminUser(token, username)
    const userDataCpanel = await getCpanelUser(token, username)
    return (
        <>

            <h3 className="text-lg space-y-3">Patient Details name: {userData.name}</h3>
            <div className="flex flex-col flex-grow gap-3 lg:flex-row my-3">
                <div className="flex-1 space-y-2">
                    <UserCard user={userData} />
                    <Card className="p-4 flex items-center">
                        <SimpleCard type='metaMaskAddress' value={user?.tezos_address} />
                    </Card>
                </div>
                <div className="flex-1">
                    <DataCard vitals={userData?.vitals} />
                </div>
            </div>


            <DeviceCard devices={userData?.devices} />
            <Link href={`/admin/${username}/map`}>See Patient Location</Link>
        </>
    )
}

export default UserAdmin