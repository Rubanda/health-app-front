import './globals.css'
import { ClerkProvider, SignIn, SignedOut } from "@clerk/nextjs/app-beta";

export const metadata = {
  title: 'Health App',
  description: 'upload document to web3 storage',
}
const fetchedImgSrc = 'https://images.unsplash.com/photo-1609780232681-2c2d078f43ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className='backdrop-blur-xl bg-cover bg-white/50 h-screen'
          style={{ backgroundImage: `url(${fetchedImgSrc})` }}>
          {children}
        </body>
      </html>
    </ClerkProvider>

  )
}
