import { Suspense } from 'react'
import Provider from '@/component/provider'
import Toast from '@/component/toast'
import './globals.css'
import { TailwindIndicator } from '../component/tailwind-indicator'
export const metadata = {
  title: 'Health App',
  description: 'upload document to web3 storage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className='bg-gray-50'
       >
        {/* <Provider> */}
          {children}
          <TailwindIndicator />
          {/* <Toast /> */}
        {/* </Provider> */}
      </body>
    </html>

  )
}
