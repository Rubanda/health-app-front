'use client'
import {
    Grid, Col, Card,
    Text, Metric,
    AccordionList,
    Accordion,
    AccordionHeader,
    AccordionBody,
    LineChart,
    AreaChart,
    CategoryBar,
    Flex,
    List,
    ListItem,
    Title,
} from "@tremor/react";
import {

} from "@tremor/react";
import { useState } from "react";
import MyModal from "./model";
import { UserDocument } from "../page";

type Props = {
    data: UserDocument

}

const chartdata = [
    {
        time: '06:00',
        "Heart rate": 65,
    },
    {
        time: '09:00',
        "Heart rate": 75,
    },
    {
        time: '18:53',
        "Heart rate": 70,
    },
    {
        time: '19:53',
        "Heart rate": 80,
    },
];

const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} bpm`;

const chartdatas = [
    {
        date: "Jan 22",
        SemiAnalysis: 2890,
        "The Pragmatic Engineer": 2338,
    },
    {
        date: "Feb 22",
        SemiAnalysis: 2756,
        "The Pragmatic Engineer": 2103,
    },
    {
        date: "Mar 22",
        SemiAnalysis: 3322,
        "The Pragmatic Engineer": 2194,
    },
    {
        date: "Apr 22",
        SemiAnalysis: 3470,
        "The Pragmatic Engineer": 2108,
    },
    {
        date: "May 22",
        SemiAnalysis: 3475,
        "The Pragmatic Engineer": 1812,
    },
    {
        date: "Jun 22",
        SemiAnalysis: 3129,
        "The Pragmatic Engineer": 1726,
    },
];

const dataFormatters = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};
export function CardComponent({ type, heart_rate, openModal }: { type: string, heart_rate: number, openModal: () => void }) {
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
                            text-black font-bold bg-opacity-0 mt-5 px-1 py-1 text-sm "
            >
                view more
            </button>

        </Card>
    )
}
type CardListProps = { item: { id: number, type: string, payload: {}, rate: any, name?: string }[] }
export function CardListComponent(items: CardListProps) {
    console.log('\n[item]')
    console.log('\t[v]', items.item[0].rate)
    const { item } = items


    return (
        <Card>
            <Title>{item[0].type}</Title>
            <List>
                {item.map((item: any) => (

                    <ListItem key={item.id}>
                        <span>{item.type}</span>
                        <span>{item.name}</span>
                        <span>{item.rate}</span>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
export function SimpleCard({ type, value }: { type: string, value: string }) {
    return (
        <div >
            <Text>{type}</Text>
            <p>{!value ? 'No Data' : value}</p>
        </div>
    )
}

// List of Vital types
export function structureData(model: any, type: string, rate: string) {
    return model.filter((item: any) => item.type === type).map((item: any) => {
        return {
            ...item,
            rate: JSON.parse(item.payload)[rate]
        }
    }).slice(0, 3)
}
export default function GridCard(data: Props) {
    const user = data.data;
    let [isOpen, setIsOpen] = useState(false)
    const [datas, setData] = useState<any>()
    const [dataFormatters, setDataFormatters] = useState<any>()

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const heartData = structureData(user.vital, 'heart', 'heart_rate')
    const oxygenData = structureData(user.vital, 'oxygen', 'oxygen_rate')
    const bmi = structureData(user.vital, 'bmi', 'bmi')
    const blood_pressure_diastole = structureData(user.vital, 'blood_pressure_diastole', 'blood_pressure_diastole')
    const respiration = structureData(user.vital, 'respiration', 'respiration_rate')


    console.log('\n[heartData]')
    console.log('\t[v]', heartData)
    return (
        <>

            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card decoration="top" decorationColor="indigo">
                        <Flex className="flex gap-4">

                            <SimpleCard type='Blood Group' value={user.blood_group} />

                            <SimpleCard type='Gender' value={user.gender} />
                        </Flex>
                    </Card>

                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card decoration="top" decorationColor="indigo">
                        <Flex className="flex gap-4 ">

                            <SimpleCard type='Height' value={`${user?.height}`} />

                            <SimpleCard type='Weight' value={`${user?.weight}`} />
                        </Flex>
                    </Card>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card decoration="top" decorationColor="indigo">
                        <SimpleCard type='metaMaskAddress' value={user?.metaMaskAddress} />
                    </Card>
                </Col>


                <Col numColSpan={2} numColSpanLg={2}>
                    <CardListComponent item={heartData} />

                </Col>
                <Col>
                    <CardListComponent item={oxygenData} />
                </Col>
                <Col>
                    <CardListComponent item={bmi} />
                </Col>

                <Card>
                    <Text>Height</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
                <Card>
                    <Flex>

                        <Text>heart</Text>
                        <Text>62 bpm</Text>
                    </Flex>
                    <CategoryBar
                        categoryPercentageValues={[50, 60, 70, 100]}
                        colors={["emerald", "yellow", "orange", "rose"]}
                        percentageValue={62}
                        className="mt-3"
                    />
                    <button
                        type="button"
                        onClick={() => { setData(chartdata); openModal(); setDataFormatters(dataFormatter) }}
                        className="rounded-md 
                            text-black font-bold bg-opacity-0 mt-5 px-1 py-1 text-sm "
                    >
                        view more
                    </button>

                </Card>

                <Card>
                    <Flex>

                        <Text>Temperature</Text>
                        <Text>78 bpm</Text>
                    </Flex>
                    {/* <AreaChart
                        className="h-72 mt-4"
                        data={chartdatas}
                        index="date"
                        categories={["The Pragmatic Engineer"]}
                        colors={["indigo"]}
                        valueFormatter={dataFormatters}
                    /> */}
                    <button
                        type="button"
                        onClick={() => { setData(chartdatas); openModal(); setDataFormatters(dataFormatters) }}
                        className="rounded-md 
                            text-black font-bold bg-opacity-0 mt-5 px-1 py-1 text-sm "
                    >
                        view more
                    </button>
                </Card>
                <Card>
                    <Text>oxygen</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
                <Card>
                    <Text>bmi</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
                <Card>
                    <Text>blood_pressure_diastole</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
                <Card>
                    <Text>respiration</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
                <Card>
                    <Text>blood_pressure_systole</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
            </Grid>
            <MyModal
                isOpen={isOpen}
                closeModal={closeModal}
                user={user}
                dataFormatters={dataFormatters}
                chartData={datas}
            />
        </>
    )
}
