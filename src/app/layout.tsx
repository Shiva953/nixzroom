import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '../components/SessionProvider'
import { getServerSession } from 'next-auth'
import NavMenu from '@/components/NavMenu'
import { Toaster } from "sonner"
import LoginHomePage from './login/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nizzroom',
  description: 'A mysterious chat room to get you trapped in the wide multiverse of anons',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  // radial-gradient(circle, rgba(71,23,83,1) 0%, rgba(17,11,56,1) 46%, rgba(0,0,0,1) 83%)
  //style={{background: 'radial-gradient(ellipse farthest-corner at center, rgba(71,23,83,1) 0%, rgba(17,11,56,1) 46%, rgba(0,0,0,1) 83%, transparent 200%)', backgroundColor:'#292929'}}
  return (
    <html lang="en" style={{background: 'radial-gradient(ellipse farthest-corner at center, rgba(71,23,83,1) 0%, rgba(17,11,56,1) 46%, rgba(0,0,0,1) 83%, transparent 200%)', backgroundColor:'#292929'}} className='text-foreground'>
      <body className={inter.className}>
        {session ?
        (<SessionProvider session={session}>
        {/* <span style={{background:"#292929 radial-gradient(30% 30% at calc(var(--bg-size) * 1%) calc(var(--bg-size) * 1%),hsl(calc(calc(var(--hue) * var(--hue-speed)) * 1deg), 100%, 90%) calc(0% * var(--bg-size)),hsl(calc(calc(var(--hue) * var(--hue-speed)) * 1deg), 100%, 80%) calc(20% * var(--bg-size)),hsl(calc(calc(var(--hue) * var(--hue-speed)) * 1deg), 100%, 60%) calc(40% * var(--bg-size)),transparent 100%)", zIndex: -4}} className='z-[-4] justify-center items-center'></span> */}
        <NavMenu/>
        <Toaster position='top-center'/>
        {children}
        </SessionProvider>) : 
        (<LoginHomePage/>)
        }
        </body>
    </html>
  )
}
