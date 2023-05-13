import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

interface Props {
    params: { username: 'momo' }
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
    console.log('[res]', userData)

    return userData
}

const UserAdmin = async ({ params }: Props) => {
    console.log('[searchParams]', params)
    const user: any = await getCurrentUser()
    // if not admin redirect to dashboard
    if (!user?.role.includes('SuperAdmin') || !user?.role.includes('doctor')) {
        redirect('/dashboard')

    }
    const token: string = user?.token
    const userData = await getAdminUser(token, params.username)
    return (
        <div>User{userData.name}</div>
    )
}

export default UserAdmin