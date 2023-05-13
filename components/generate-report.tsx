'use client'
import { useState } from 'react'
import axios from 'axios'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import { CardWithForm } from '@/components/report-card'


export const GenerateReport = ({ token }: any) => {
    const wallet = 'dddgleoiurowhetw0395283-4'
   
    console.log('fetchedReport', { token })
    return (
        <>
            
            <CardWithForm />


        </>
    )
}
