'use client'
import {
    Grid, Col, Card,
    Text, Metric,
    CategoryBar,
    Flex,
    Button,
    TextInput,
} from "@tremor/react";
import {

} from "@tremor/react";
import { use, useState, useEffect } from "react";
import MyModal from "./model";
import { UserDocument } from "../app/(dashboard)/dashboard/page";
import { ArrowSmallRightIcon, ArrowDownTrayIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import TezosLogo from "../../public/SVG/TezosLogo_Icon_Blue.svg"
import Image from "next/image";
import ModalPdf from "./pdf";

type Props = {
    data: UserDocument
    token: string

}
/** 
@description: This component is used to display type and value of simple data
@param type: string
@param value: string
*/
export function SimpleCard({ type, value }: { type: string, value: string }) {
    return (
        <div >
            <Text>{type}</Text>
            <p>{!value ? 'No Data' : value}</p>
        </div>
    )
}

/** 
@description: This component is used to display type and value of simple data
@param type: string
@param heart_rate: string
@param openModal: function
*/
export function CardComponent({ type, heart_rate, openModal }:
    {
        type: string, heart_rate: number, openModal: () => void
    }) {


    return (
        <Card>
            <Flex>

                <Text>{type}</Text>
                <Text>{heart_rate}</Text>
            </Flex>
            <CategoryBar
                categoryPercentageValues={[50, 60, 70, 100]}
                colors={["emerald", "yellow", "orange", "rose"]}
                percentageValue={62}
                className="mt-3"
            />
            <button
                type="button"
                onClick={openModal}
                className="rounded-md 
                            text-black font-medium bg-opacity-0 mt-5 px-2 py-3 text-sm hover:bg-white hover:text-black hover:border hover:border-black"
            >
                view more
            </button>

        </Card>
    )
}
type CardListProps = { item: { id: number, type: string, payload: {}, rate: any, name?: string }[] }
/** 
@description: This component for displaying Measured data
@param items: CardListProps
*/
export function CardListComponent(items: CardListProps) {
    const item = items?.item
    let [isOpen, setIsOpen] = useState(false)
    const [datas, setData] = useState<any>()
    const [dataFormatters, setDataFormatters] = useState<any>()

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <MyModal
                isOpen={isOpen}
                closeModal={closeModal}
                chartData={datas}
            />

            <Card>
                <Flex className="flex flex-col md:flex-row">

                    <div>
                        <Text>{item?.length > 0 ? item[0]?.type : "No Data"}</Text>
                        <Metric>{item?.length > 0 ? item[0]?.rate : "No Data"}</Metric>
                    </div>

                    <button
                        type="button"
                        onClick={() => { setData(item); openModal(); setDataFormatters(dataFormatters) }}
                        className="flex items-center  text-black p-1 px-2 rounded-lg text-base font-semibold
                    hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                     ">
                        View more <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
                    </button>
                </Flex>

            </Card>
        </>
    )
}

// List of Vital types
export function structureData(model: any, type: string, rate: string) {
    return model?.filter((item: any) => item.type === type).map((item: any) => {
        return {
            ...item,
            rate: JSON.parse(item.payload)[rate]
        }
    }).slice(0, 3)
}
// export async function generateReport(token: string) {
//     const report = await axios.post('http://localhost:4000/api/user/pdf', {}, {
//         headers: {
//             Authorization: 'Bearer ' + token
//         }
//     })
//     console.log(report)
//     if (report.status === 200) {
//         console.log('report generated')
//         return report
//     }
// }
export default function GridCard({ data, token }: Props) {
    const user = data;
    // const [report, setReport] = useState<{ pdf: string }>()
    const [loading, setLoading] = useState(false)
    const [fetchedReport, setFetchedReport] = useState<{pdf: string}>({ pdf: '' })
    const [isOpen, setIsOpen] = useState(false)
    
    const heartData = structureData(user.vitals, 'heart', 'heart_rate')
    const oxygenData = structureData(user.vitals, 'oxygen', 'oxygen_rate')
    const bmi = structureData(user.vitals, 'bmi', 'bmi')
    const blood_pressure_diastole = structureData(user.vitals, 'blood_pressure_diastole', 'blood_pressure_diastole')
    const respiration = structureData(user.vitals, 'respiration', 'respiration_rate')
    // generateReport 
    async function generateReport(token: string, event: any) {
        event.preventDefault()
        setLoading(true)
        const report = await axios.post('http://localhost:4000/api/user/pdf', {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        if (report.status === 200) {
            setFetchedReport(report.data)
            console.log('report generated'+ report.data)
        }
        setLoading(false)
    }
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    return (
        <>
            <ModalPdf
                isOpen={isOpen}
                closeModal={closeModal}
                chartData={data}
                token={token}     
            />
            <Grid
                numCols={1} numColsSm={2} numColsLg={3}
                className="gap-2">
                <Col
                // numColSpan={1} numColSpanLg={1}
                >
                    <Card>
                        <Flex className="flex gap-4">

                            <SimpleCard type='Blood Group' value={user.blood_group} />

                            <SimpleCard type='Gender' value={user.gender} />
                        </Flex>
                    </Card>

                </Col>
                <Col
                // numColSpan={1} numColSpanLg={1}
                >
                    <Card>
                        <Flex className="flex gap-4 ">

                            <SimpleCard type='Height' value={`${user?.height}`} />

                            <SimpleCard type='Weight' value={`${user?.weight}`} />
                        </Flex>
                    </Card>
                </Col>
                <Col
                // numColSpan={3} numColSpanLg={1}
                >
                    <Card>
                        <SimpleCard type='metaMaskAddress' value={user?.metaMaskAddress} />
                    </Card>
                </Col>


                <Col>
                    <CardListComponent item={heartData} />

                </Col>
                <Col>
                    <CardListComponent item={oxygenData} />
                </Col>
                <Col>
                    <CardListComponent item={bmi} />
                </Col>

                <Col>
                    <CardListComponent item={blood_pressure_diastole} />
                </Col>
                <Col>
                    <CardListComponent item={respiration} />
                </Col>


            </Grid>
            {/* generate report button */}
            <Card className="mt-6">
                <button
                    type="button"
                    onClick={(event) => {generateReport(token, event);  openModal();}}
                    disabled={loading}
                    className={`flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                    hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                     ${loading}`}>
                    {loading ? 'loading...' : 'Generate Report'} <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
                </button>
            </Card>

        </>
    )
}
