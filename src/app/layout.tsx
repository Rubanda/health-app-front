import { Suspense } from 'react'
import './globals.css'
import Provider from '@/app/component/provider'
import Toast from '@/app/component/toast'
import Navbar from '@/app/component/navbar'
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
    <html lang="en">
      <body
        className='bg-gray-50'
       >
        <Provider>
          <Suspense fallback='...'>
            <Navbar />
          </Suspense>
          {children}
          <Toast />
        </Provider>
      </body>
    </html>

  )
}
