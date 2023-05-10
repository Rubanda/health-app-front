'use client'
import { Grid, Col, Card, Flex } from "@tremor/react";
import { useEffect, useState } from "react";
import { UserDocument } from "../app/(dashboard)/dashboard/page";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ModalPdf from "./pdf";
import { SimpleCard } from "./cards/simpleCard";
import { CardListComponent } from "./cards/listCard";
import MyComponents from '@/component/google-map';
import Toast from "./toast";
import { connectWallet, getActiveAccount, disconnectWallet, } from "./beacon";

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
    // const [report, setReport] = useState<{ pdf: string }>()
    const [loading, setLoading] = useState(false)
    const [fetchedReport, setFetchedReport] = useState<{ pdf: string }>({ pdf: '' })
    const [isOpen, setIsOpen] = useState(false)
    const [toggleMap, setToggleMap] = useState(false)

    const heartData = structureData(user.vitals, 'heart', 'heart_rate')
    const oxygenData = structureData(user.vitals, 'oxygen', 'oxygen_rate')
    const bmi = structureData(user.vitals, 'bmi', 'bmi')
    const blood_pressure_diastole = structureData(user.vitals, 'blood_pressure_diastole', 'blood_pressure_diastole')
    const respiration = structureData(user.vitals, 'respiration', 'respiration_rate')
    // generateReport 
    async function generateReport(token: string, event: any) {
        event.preventDefault()
        setLoading(true)
        const report = await axios.post('https://health.masatafit.com/api/user/pdf', {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        if (report.status === 200) {
            setFetchedReport(report.data)
        }
        setLoading(false)
    }
    async function generateReportAndOpenModal(token: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        await new Promise<void>(async (resolve) => {
            await generateReport(token, event);
            resolve();
        });
        openModal();
    }
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    function toggleMaps() {
        setToggleMap(!toggleMap)
    }
    // Temple wallet
    const [wallet, setWallet] = useState<any>(null);
    const [akord, setAkord] = useState<any>(null);

    const handleConnectWallet = async () => {
        const { wallet } = await connectWallet();
        setWallet(wallet);
    };
    const handleDisconnectWallet = async () => {
        const { wallet } = await disconnectWallet();
        setWallet(wallet);
    };

    useEffect(() => {
        const func = async () => {
            const account: any = await getActiveAccount();
            if (account) {
                setWallet(account.address);
            }
        };
        func();
    }, []);
    return (
        <>
            <ModalPdf
                wallet={wallet}
                isOpen={isOpen}
                closeModal={closeModal}
                chartData={data}
                token={token}
                report={fetchedReport}
            />
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
                {/* generate report button && map*/}
                <Col>
                    <Card className="h-full w-full !p-0">
                        <div className="flex h-full justify-center gap-4">
                            <button
                                className={` flex w-full items-center px-4 py-2 ${toggleMap ? 'bg-green-500' : 'bg-black'} text-white rounded-lg text-base font-semibold
                                hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                                `} onClick={toggleMaps}>
                                Show Map
                            </button>
                            <button
                                type="button"
                                onClick={(event) => { generateReportAndOpenModal(token, event); }}
                                disabled={loading}
                                className={`flex w-full items-center px-4 py-2 ${loading ? 'bg-green-500' : 'bg-black'} text-white rounded-lg text-base font-semibold
                                hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                                ${loading}`}>
                                {loading ? 'loading...' : 'Generate Report'} <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </Card>
                </Col>


            </Grid>


            <div>
                {toggleMap ?
                    <MyComponents location={user?.latest_location} /> : null
                }
            </div>
            <Toast wallet={wallet} handleConnectWallet={handleConnectWallet} handleDisconnectWallet={handleDisconnectWallet} />

        </>
    )
}
