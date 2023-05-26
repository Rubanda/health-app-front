'use client'
import React from 'react'
import { Card } from './ui/card'
import Image from 'next/image'
import TezosLogo from "@/public/SVG/TezosLogo_Icon_Blue.svg"
import { Icons } from './icons'

export const Prediction = ({ tezosPrediction }: any) => {
    const [prediction, setPrediction] = React.useState<any>(false)
    const [advised, setAdvised] = React.useState<any>(false)
    console.log('[tezosPrediction]', tezosPrediction)
    React.useEffect(() => {
        if (tezosPrediction?.xtz_predicted_price > tezosPrediction?.xtz_current_price) {
            setAdvised(true)
            setPrediction(true)
        }
    }, [tezosPrediction])

    return (
        <>
            <Card className='max-w-sm p-3 flex items-start justify-center bg-black/5'>
                <div className='flex flex-col justify-between gap-2'>
                    <div className='flex gap-2'>
                        <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" /> Tezos XTZ
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='text-3xl'>$ {tezosPrediction?.xtz_current_price}</span>
                        <span className={` flex gap-1 items-center ${prediction === true ? 'text-green-500' : 'text-red-500'} text-sm items-end`} >
                            {prediction === true ? <Icons.chevronUp className='h-4 w-4 text-green-500' /> : <Icons.chevronDown className='h-4 w-4 text-red-500' />}
                            {tezosPrediction?.xtz_predicted_price.toFixed(4)}</span>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <span className='text-sm text-gray-400'>{advised === true ? 'USE TEZO' : 'NOT ADVISED'}</span>
                </div>
            </Card>
        </>
    )
}
