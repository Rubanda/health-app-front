'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

export const Logout = () => {
    return (
        <><Button

            className={cn(
                "px-4"
            )}
            onClick={() => signOut()}
        >
            Logout
        </Button></>
    )
}
