import { Card} from '@/components/ui/card'
import { CardListComponent } from './listCard'

/**
 *  @description: This function is used to structure data for vitals
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

export const DataCard = ({vitals}:any) => {
    const heartData = structureData(vitals, 'heart', 'heart_rate')
    const oxygenData = structureData(vitals, 'oxygen', 'oxygen_rate')
    const bmi = structureData(vitals, 'bmi', 'bmi')
    const blood_pressure_diastole = structureData(vitals, 'blood_pressure_diastole', 'blood_pressure_diastole')
    const respiration = structureData(vitals, 'respiration', 'respiration_rate')
    return (
        <Card className=''>
            <div>
                <CardListComponent item={heartData} />

            </div>
            <div>
                <CardListComponent item={oxygenData} />
            </div>
            <div>
                <CardListComponent item={bmi} />
            </div>

            <div>
                <CardListComponent item={blood_pressure_diastole} />
            </div>
            <div>
                <CardListComponent item={respiration} />
            </div>
        </Card>
    )
}
