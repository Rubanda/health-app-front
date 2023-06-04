'use client'
import { useState,useEffect } from "react";
import { UserDocument } from "../app/(dashboard)/dashboard/page";
import { SimpleCard } from "@/components/cards/simpleCard";
import { Card } from "@/components/ui/card";
import UserCard from "@/components/cards/user-card";
import { DeviceCard } from "@/components/cards/device-card";
import { DataCard } from "@/components/cards/data-card";
import { connectWallet, disconnectWallet, getActiveAccount } from "./beacon";
import TezosLogin from "@/components/login-tezos";
// import { connectWallet, getActiveAccount, disconnectWallet, } from "./beacon";

type Props = {
    data: UserDocument
    token: string

}


/**
 *  @description: This component is used to display type and value of simple data
 * @param Props: {data: UserDocument, token: string}
 */
export default function GridCard({ data, token }: Props) {
    const user = data;
    const { vitals,devices } = user;
    // generateReport 

    // Temple wallet
    const [wallet, setWallet] = useState<any>(null);

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

            <div className="flex  flex-col lg:flex-row gap-3">
                <div className="flex flex-col">
                    <UserCard user={user} />

                </div>


                <div className="flex flex-col flex-grow gap-2">
                    <Card className="drop-shadow-md border-none p-4 flex items-center">
                        <SimpleCard type='metaMaskAddress' value={user?.tezos_address} />
                    </Card>

                   <DeviceCard devices={devices} />

                    <DataCard vitals={vitals}/>

                </div>
            </div>
        </>
    )
}



