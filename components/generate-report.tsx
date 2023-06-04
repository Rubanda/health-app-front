import { CardWithForm } from '@/components/report-card'

export const GenerateReport = ({ token,reportUrl,user }: any) => {
    const {reportUrl:report} = reportUrl
    return (
        <>
            <CardWithForm token={token} report={report} user={user}/>
        </>
    )
}
