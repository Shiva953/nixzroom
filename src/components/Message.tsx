'use client'

import { MessageType } from "@/app/lib/definitions";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";
import { Card,CardContent } from "./ui/card";
import { useSession } from "next-auth/react";
import MessageMenu from "./MessageMenu";

export default function Message({ message }: { message: MessageType }){
	const {data: session, status} = useSession()
    return(
		<Card className="m-4 min-h-24 overflow-y-auto w-[24rem] border-[1.4px] border-white">
        <CardContent className="grid gap-6 min-h-24 align-middle mt-4 overflow-y-auto">
		<div className="flex gap-2">
              <Avatar>
                <AvatarImage src={`${message.userM.image}`}/>
				{/* <AvatarImage src={`https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704240000&semt=ais`} className="bg-white w-24 h-24"/> */}
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>

			  <div className="flex-1">
			  <div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						<h1 className="font-bold">
							{message.userM.username}
						</h1>
						<h2 className="text-[0.75rem] ml-2 text-gray-400">
							{new Date(message.created_at).toDateString()}
						</h2>
					</div>
					{message.userIdForThisMessage === Number(session?.user?.id?.substring(0,9)) && (
						<MessageMenu message={message} />
					)}
				</div>
                <p className="text-white overflow-y-visible max-w-40">
                  {message.description}
                </p>
				</div>
				</div>
        </CardContent>
	  </Card>
    )
}