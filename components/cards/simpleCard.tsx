/** 
@description: This component is used to display type and value of simple data
@param type: string
@param value: string
*/
export function SimpleCard({ type, value }: { type: string, value: string }) {
    return (
        <div >
            <p>{type}: {!value ? 'No Data' : value}</p>
        </div>
    )
}