'use client'
// import React from 'react'
// import { Card } from '../ui/card'

// export const ListUser = ({ users }: any) => {
//     return (
//         <>
//             <Card className="p-3">
//                 {users?.map((item: any, index: number) => (
//                     <div key={item.id + index}>
//                         <div className='flex items-center justify-between'>
//                             <span>{item.name}</span>
//                             <span>{item.email}</span>
//                         </div>
//                     </div>
//                 ))}
//             </Card>
//         </>
//     )
// }

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

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export function TableDemo({ allUsers }: any) {
    console.log('allUsers', allUsers)
    const role = allUsers?.map((user: any) => user.Roles.map((role: any) => role.name))
    console.log('role', role)
    return (
        <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
                <TableRow>
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
                        <TableCell><Link href={`/admin/${user.username}`}>{user.username}</Link></TableCell>
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
