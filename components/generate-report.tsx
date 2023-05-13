'use client'
import { CardWithForm } from '@/components/report-card'


export const GenerateReport = ({ token,reportUrl }: any) => {
    const wallet = 'dddgleoiurowhetw0395283-4'
    const {reportUrl:report} = reportUrl
    return (
        <>
            
            <CardWithForm token={token} report={report}/>


        </>
    )
}
