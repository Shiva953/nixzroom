'use client'

import { MessageType } from "@/app/lib/definitions";
import { DropdownMenu,DropdownMenuItem,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuLabel,DropdownMenuSeparator } from "./ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react'
import { deleteMessage } from "@/app/lib/actions";
import { Toaster, toast } from "sonner"
export default function MessageMenu({ message }: { message: MessageType }){

    return(
        <>
        <DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Action</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async() => {
						document.getElementById("trigger-delete")?.click();
                        const res = deleteMessage(message.id)
						if(!res){
							toast.error('Unable To Delete The Message.')
						}
						else{
							toast.success('Message Deleted Succesfully.')
						}
					}}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
        </>
    )
}