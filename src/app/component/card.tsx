import fetchUser from "@/lib/fetchData";
import {
    Grid, Col, Card,
    Text, Metric,
    AccordionList,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@tremor/react";
import {

} from "@tremor/react";

type Props = {
    data: {
        id: number,
        name: string,
        username: string,
        email: string,
        mqtt_server: string,
        phone: string,
        address: string,
        date_of_birth: string,
        blood_group: string,
        gender: string,
        avatar: string,
        height: number,
        weight: number,
        created_at: string,
        updated_at: string,
        roles: [],
        devices: [],
        vital: [],
        location: []
    }
}


export default function GridCard(data: Props) {
    const { data: user } = data;
    console.log('\n[data]')
    console.log('\t', user.name)
    return (
        <>
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card decoration="top" decorationColor="indigo">
                        <Text>Blood Grooup</Text>
                        <p>{user?.blood_group}</p>
                    </Card>
                </Col>
                <Card>
                    <Text>Gender</Text>
                    <p>{user?.gender}</p>
                </Card>
                <Col>
                    <Card>
                        <Text>mqtt_server</Text>
                        <Metric>{user?.mqtt_server}</Metric>
                    </Card>
                </Col>
                <Card>
                    <Text>Weight</Text>
                    <Metric>{user?.weight} kg</Metric>
                </Card>
                <Card>
                    <Text>Height</Text>
                    <Metric>{user?.height} cm</Metric>
                </Card>
            </Grid>
        </>
    )
}
