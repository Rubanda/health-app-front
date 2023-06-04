import { Card } from '@/components/ui/card'
import { CardListComponent } from './listCard'

/**
 * @description: This function is used to structure data for vitals
 * @param model: any
 * @param type: string
 * @param rate: string
 */
export function structureData(model: any, type: string, rate: string) {
    return model?.filter((item: any) => item.type === type).map((item: any) => {
        return {
            ...item,
            rate: JSON.parse(item.payload)[rate]
        }
    }).slice(0, 3)
}

export const DataCard = ({ vitals }: any) => {
    const heartData = structureData(vitals, 'heart', 'heart_rate')
    const oxygenData = structureData(vitals, 'oxygen', 'oxygen_rate')
    const bmi = structureData(vitals, 'bmi', 'bmi')
    const blood_pressure_diastole = structureData(vitals, 'blood_pressure_diastole', 'blood_pressure_diastole')
    const respiration = structureData(vitals, 'respiration', 'respiration_rate')
    console.log({ heartData, oxygenData, bmi, blood_pressure_diastole, respiration })
    return (
        // <Card className=''>
        <>
            {vitals?.length > 0 ? (<Card className='drop-shadow-md border-none'>
                <div>
                    {heartData.length > 0 ? <CardListComponent item={heartData} /> : null}

                </div>
                <div>
                    {oxygenData.length > 0 ? <CardListComponent item={oxygenData} /> : null}
                </div>
                <div>
                    {bmi.length > 0 ? <CardListComponent item={bmi} /> : null}
                </div>

                <div>
                    {blood_pressure_diastole.length > 0 ? <CardListComponent item={blood_pressure_diastole} /> : null}
                </div>
                <div>
                    {respiration.length > 0 ? <CardListComponent item={respiration} /> : null}
                </div>
            </Card>) : <Card className='drop-shadow-md shadow-md border-none h-full flex items-center justify-center p-4'>No Vital&apos;s Data</Card>
            }
        </>
    )
}
