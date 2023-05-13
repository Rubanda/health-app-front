import { ListUser } from '@/components/admin/list'
import { getCurrentUser } from '@/lib/session'
import React from 'react'

async function getUser(token: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/user`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            cache: 'no-store'
        })
    const json = await res.json()
    return json
}

const Admin = async () => {
    const user: any = await getCurrentUser()
    const token: string = user?.token

    const users = await getUser(token)
    return (
        <>
           <ListUser users={users}/>
        </>
    )
}

export default Admin