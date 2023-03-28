'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SignIn } from '@clerk/nextjs/app-beta';
import { useUser, UserButton } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })
declare global {
  interface Window { ethereum: any; }
}
export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return (
      <div className='flex flex-col flex-grow items-center justify-center h-screen	 '>
      <SignIn />

      </div>
    )
  }
  console.log('[user]', user?.primaryWeb3Wallet,)

  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <div className='flex justify-between items-center text-xs max-w-1100 w-full z-2 font-mono'>
        <Image
          src="/iot-logo.svg"
          alt="health app Logo"
          className=''
          width={100}
          height={44}
          priority
        />
        <div className='flex justify-center items-center gap-3'>
          {user && (
            <>
              <button className='relative m-0 p-3 px-4 bg-opacity-50 bg-gray-300 border border-gray-400 rounded-lg'>
                {user?.firstName}  {user.primaryWeb3Wallet?.web3Wallet.slice(0, 6) + '...' + user.primaryWeb3Wallet?.web3Wallet.slice(-4)} 
                <span className='absolute top-0 right-0 mt-3 ml-2 w-3 h-3 rounded-full bg-green-500'></span>
              </button>
              <UserButton />
            </>
          )
          }
        </div>
      </div>

      <div className='flex justify-center items-center py-16'>

      </div>

      <div className=''>
        <h2 className={inter.className}>
          {user?.firstName} <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          You can upload your files here.
        </p>
      </div>
    </main>
  )
}
