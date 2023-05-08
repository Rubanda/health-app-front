'use client'
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline"
import { Card, Flex, Metric, Text } from "@tremor/react"
import { useState } from "react"
import MyModal from "./model";

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

            <Card className="h-full">
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