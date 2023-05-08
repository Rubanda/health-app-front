'use client'
import { DAppClient, Network, NetworkType,TezosOperationType } from "@airgap/beacon-sdk";

import config from "../config/wallet";

let myAddress: string | undefined;
const network: Network = { type: NetworkType.GHOSTNET };

const options = {
    name: "health app ",
    iconUrl: "https://tezostaquito.io/img/favicon.png",
    rpcURL: "https://rpc.tzkt.io/ghostnet",
    preferredNetwork: network.type,
};
const rpcURL = "https://rpc.tzkt.io/ghostnet";
const dAppClient = new DAppClient(options);

const getActiveAccount = async () => {
    return await dAppClient.requestPermissions({
        network: {
            type: NetworkType.GHOSTNET,
            rpcUrl: "https://rpc.tzkt.io/ghostnet/",
          },}
    );
};

const connectWallet = async (): Promise<{ success: boolean, wallet: string }> => {
    const activeAccount = await dAppClient.getActiveAccount();
    console.log("activeAccount", activeAccount)
    if (activeAccount) {
        // If defined, the user is connected to a wallet.
        // You can now do an operation request, sign request, or send another permission request to switch wallet
        console.log("!!!!!!Already connected:!!!!!", activeAccount.address);
        myAddress = activeAccount.address;
    } else {
        const permissions = await getActiveAccount();
        console.log("New connection:", permissions.address);
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
        const activeAccount = await dAppClient.getActiveAccount();
        if (!activeAccount) {
            await dAppClient.requestPermissions();
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

const requestOperation = async () => {
    try {
        const activeAccount = await getActiveAccount();
        if (!activeAccount) {
            await dAppClient.requestPermissions();
        }
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                  kind: TezosOperationType.TRANSACTION,
                  amount: "1",
                  destination: config.contractAddress,
                  parameters: {
                    entrypoint: 'set_value',
                    value: {
                      string: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                    },
                  },
                },
              ],
        });
        console.log('[result]', result)
        return {
            success: true,
            result,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};


export {
    connectWallet,
    getActiveAccount,
    checkIfWalletConnected,
    disconnectWallet,
    requestOperation,
};