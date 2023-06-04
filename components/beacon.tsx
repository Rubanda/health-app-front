'use client'
import { DAppClient, Network, NetworkType,TezosOperationType } from "@airgap/beacon-sdk";

import config from "../config/wallet";

let myAddress: string | undefined;
const network: Network = { type: NetworkType.GHOSTNET };

const options = {
    name: "health app ",
    network,
    rpcUrl: "https://rpc.tzkt.io/ghostnet/", 
};
const dAppClient = new DAppClient(options);

const getActiveAccount = async () => {
    try {
      const activeAccount = await dAppClient.getActiveAccount();
      return activeAccount;
    } catch (error) {
      console.error("Error getting active account", error);
      return undefined;
    }
  };
const connectWallet = async (): Promise<{ success: boolean, wallet: string }> => {
    const activeAccount = await getActiveAccount();
    console.log("activeAccount", activeAccount)
    if (activeAccount) {
        // If defined, the user is connected to a wallet.
        // You can now do an operation request, sign request, or send another permission request to switch wallet
        console.log("!!!!!!Already connected:!!!!!", activeAccount.address);
        myAddress = activeAccount.address;
    } else {
        const permissions = await dAppClient.requestPermissions({
            network: {
                type: NetworkType.GHOSTNET,
                rpcUrl: "https://rpc.tzkt.io/ghostnet/",
            },
        });
        myAddress = permissions.address;
    }
    return { success: true, wallet: myAddress };
};

const disconnectWallet = async () => {
  await dAppClient.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet: any) => {
    try {
        const activeAccount = await getActiveAccount();
        if (!activeAccount) {
            await connectWallet();
        }
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

const requestOperation = async (pdfFile:string) => {
    try {
        const activeAccount = await getActiveAccount();
        console.log('[activeAccount]', activeAccount)
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                  kind: TezosOperationType.TRANSACTION,
                  amount: "1",
                  destination: config.contractAddress,
                  parameters: {
                    entrypoint: 'set_value',
                    value: {
                      string: pdfFile,
                    },
                  },
                },
              ],
        });
        console.log('[result---after sending token]', result)
        return result
    } catch (error) {
        return error
    }
};


export {
    dAppClient,
    connectWallet,
    getActiveAccount,
    checkIfWalletConnected,
    disconnectWallet,
    requestOperation,
};