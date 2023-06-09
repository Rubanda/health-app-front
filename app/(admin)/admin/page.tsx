import { TableDemo } from '@/components/admin/list'
import { CpanelUser } from '@/components/admin/cpanel-user'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'
import { config } from '@/config/config'
async function getUser(token: string) {
    console.log('[backendurl]', config.backendUrl)
    const res = await fetch(`${config.backendUrl}/api/user`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            cache: 'no-store'
        })
    const allUsers = await res.json()
    return allUsers
}
async function getUserFromCpanel(token: string) {
    const res = await fetch(`${config.backendUrl}/api/user/cpanel/names`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            cache: 'no-store'
        })
    const allUsersNames = await res.json()
    return allUsersNames
}

const Admin = async () => {
    const user: any = await getCurrentUser()
    console.log('[user]::admin-->page"', !user?.role.includes('SuperAdmin') || !user?.role.includes('doctor') )
    const token: string = user?.token
    // if not admin redirect to dashboard
    if (!user?.role.includes('SuperAdmin') || !user?.role.includes('doctor')) {
        redirect('/dashboard')

    }
    const allUsers = await getUser(token)
    const patientCpanel:string[] = await getUserFromCpanel(token)
    // console.log('[allUsers]', allUsers)
    return (
        <>
            <h1>Admin Page </h1>
            <CpanelUser patient={patientCpanel}/>
           <TableDemo allUsers={allUsers}/>
        </>
    )
}

export default Admin