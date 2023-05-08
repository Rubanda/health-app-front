import { Suspense } from 'react'
import Provider from '@/component/provider'
import Toast from '@/component/toast'
import Navbar from '@/component/navbar'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'
export const metadata = {
  title: 'Health App',
  description: 'upload document to web3 storage',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }
  return (
   
      <main
        className='bg-gray-50'
       >
        {/* <Provider>
          <Suspense fallback='...'> */}
            <Navbar  user={user}/>
          {/* </Suspense> */}
          {children}
        {/* </Provider> */}
      </main>

  )
}
