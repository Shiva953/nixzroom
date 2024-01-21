import { getServerSession } from 'next-auth'
import ChatRoom from '../components/ChatRoom'
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/login`)
  }
  console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="h-[50rem] w-full dark:bg-black  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black [mask-image:radial-gradient(circle, rgba(71,23,83,1) 0%, rgba(17,11,56,1) 46%, rgba(0,0,0,1) 83%)]"></div>
      <div className='m-2 p-2 flex-col items-center'>
        <ChatRoom/>
      </div>
      </div>
    </main>
  )
}
