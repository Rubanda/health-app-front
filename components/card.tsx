'use client'
import { Grid, Col, Card, Flex } from "@tremor/react";
import { useState } from "react";
import { UserDocument } from "../app/(dashboard)/dashboard/page";
import { SimpleCard } from "./cards/simpleCard";
import { CardListComponent } from "./cards/listCard";
// import { connectWallet, getActiveAccount, disconnectWallet, } from "./beacon";

type Props = {
    data: UserDocument
    token: string

}



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

/**
 *  @description: This component is used to display type and value of simple data
 * @param Props: {data: UserDocument, token: string}
 */
export default function GridCard({ data, token }: Props) {
    const user = data;

    const heartData = structureData(user.vitals, 'heart', 'heart_rate')
    const oxygenData = structureData(user.vitals, 'oxygen', 'oxygen_rate')
    const bmi = structureData(user.vitals, 'bmi', 'bmi')
    const blood_pressure_diastole = structureData(user.vitals, 'blood_pressure_diastole', 'blood_pressure_diastole')
    const respiration = structureData(user.vitals, 'respiration', 'respiration_rate')
    // generateReport 

    // Temple wallet
    const [wallet, setWallet] = useState<any>(null);
    const [akord, setAkord] = useState<any>(null);

    // const handleConnectWallet = async () => {
    //     const { wallet } = await connectWallet();
    //     setWallet(wallet);
    // };
    // const handleDisconnectWallet = async () => {
    //     const { wallet } = await disconnectWallet();
    //     setWallet(wallet);
    // };

    // useEffect(() => {
    //     const func = async () => {
    //         const account: any = await getActiveAccount();
    //         if (account) {
    //             setWallet(account.address);
    //         }
    //     };
    //     func();
    // }, []);
    return (
        <>
            
            <Grid
                numCols={1} numColsSm={2} numColsLg={3}
                className="gap-2">
                <Col>
                    <Card className="h-full">
                        <Flex className="flex gap-4">
                            <SimpleCard type='Blood Group' value={user.blood_group} />
                            <SimpleCard type='Gender' value={user.gender} />
                        </Flex>
                    </Card>

                </Col>
                <Col>
                    <Card className="h-full">
                        <Flex className="flex gap-4 ">
                            <SimpleCard type='Height' value={`${user?.height}`} />
                            <SimpleCard type='Weight' value={`${user?.weight}`} />
                        </Flex>
                    </Card>
                </Col>
                <Col>
                    <Card className="h-full">
                        <SimpleCard type='metaMaskAddress' value={user?.tezos_address} />
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



            {/* <Toast wallet={wallet} handleConnectWallet={handleConnectWallet} handleDisconnectWallet={handleDisconnectWallet} /> */}

        </>
    )
}
