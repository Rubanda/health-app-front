'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"


export function TableDemo({ allUsers }: any) {
    // console.log('allUsers', allUsers)
    const role = allUsers?.map((user: any) => user.Roles.map((role: any) => role.name))
    // console.log('role', role)
    return (
        <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Avatar</TableHead>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead className="text-right">Gender</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allUsers?.map((user: any) => (
                    <TableRow key={user.username}>
                        <TableCell><UserAvatar className="" user={{ image: user?.avatar }} /></TableCell>
                        <TableCell><Link href={`/admin/${user.username}`} className="cursor-pointer hover:underline hover:text-sky-500 ">{user.username}</Link></TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="flex gap-3">{user.Roles.map((role: { name: string },index:number) =>( <Badge key={role.name + index } variant="secondary">{role.name}</Badge> ))}</TableCell>
                        <TableCell className="text-right">{user.gender}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
