'use client'

import { useEffect, useState } from "react";
import DismissButton from '@/components/dismissButton';

export default function Toast({wallet,handleDisconnectWallet,handleConnectWallet}:any) {
 
  const isHidden = false;
  return isHidden ? null : (
    <div className="sticky rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
      <div className="rounded-[14px] w-full h-full bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-black text-[13px] font-mono w-[304px] h-10 flex items-center justify-center p-3">
          Get started with MetaMask Login instantly. <DismissButton />
        </p>
        <button
          className="text-white text-[13px] cursor-pointer font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
          onClick={wallet ? handleDisconnectWallet : handleConnectWallet}
          
        >
         💳{" "}
          {wallet
            ? wallet.slice(0, 4) +
              "..." +
              wallet.slice(wallet.length - 4, wallet.length)
            : "Connect with Temple"}
        </button>
      </div>
    </div>
  );
}
