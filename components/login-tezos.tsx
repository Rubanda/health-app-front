'use client'
import React from 'react'
import { connectWallet, disconnectWallet, getActiveAccount } from "@/components/beacon";
import Toast from '@/components/toast';

export default function TezosLogin() {
    const [wallet, setWallet] = React.useState<any>(null);
    const handleConnectWallet = async () => {
        const { wallet } = await connectWallet();
        setWallet(wallet);
    };
    const handleDisconnectWallet = async () => {
        const { wallet } = await disconnectWallet();
        setWallet(wallet);
    };

    return (
        <div>
            <Toast wallet={wallet} handleConnectWallet={handleConnectWallet} handleDisconnectWallet={handleDisconnectWallet} />
        </div>
    )
}
