'use client'

import { sendMessage } from "@/app/lib/actions"
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function ChatInput(){
  const { data: session, status } = useSession();
  if (!session || !session.user) {
    <div>...Loading</div>
  }

  const username = session?.user?.name || 'randomuser';
  const image = session?.user?.image || 'https://icon-library.com/images/default-profile-icon/default-profile-icon-0.jpg';

  const sendMessageWithUser = sendMessage.bind(null, Number(session?.user?.id?.substring(0,9)), username, image)
    return(
      <>
            <form action={sendMessageWithUser} className="w-full items-center justify-center ml-8 mb-8 mt-4" noValidate>
              <div className="flex w-full max-w-sm items-center justify-center space-x-2">
                
                <Input
                  name="mainPart"
                  placeholder="enter message"
                  type="text"
                  className="text-white font-medium text-[1rem] bg-black h-14 rounded-3xl"
                  autoComplete="off"
                />
                <Button type="submit" variant={'default'} className="mx-2 bg-white rounded w-32 h-12 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-violet-500 hover:text-white">Send</Button>
              </div>
              </form>
              </>
    )
}