import {  Auth } from "@akord/akord-js";


const connectWalletAkord = async (): Promise<{ success: boolean, akord: any }> => {
    const akord =  Auth.configure({ apiKey: process.env.AKORD_KEY });
    return { success: true,  akord };
};

// const createVault = async ()=>{
//     const { vaultId, membershipId } = await akord.vault.create(
//         "my first public vault",
//         { public: true, termsOfAccess: "terms of access here - if the vault is intended for professional or legal use, you can add terms of access and they must be digitally signed before accessing the vault" }
//       );
// }

export { connectWalletAkord}