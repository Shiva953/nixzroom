'use client'

import { ActualMessageType, MessageType } from "@/app/lib/definitions";
import { useEffect,useState,useRef } from "react";
import supabase from "@/app/lib/db";
import Message from "./Message";
import getUserAlongWithMessage from "@/app/lib/actions";

export const dynamic = 'force-dynamic' //opting out of caching

export default function ChatMessages({ serverMessages } : {serverMessages : MessageType[]}){
    const [messages,setMessages] = useState(serverMessages); //intiializing with the initial messages in the server
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // SUBSCRIBING TO THE CHANNEL and listening WHENEVER an event(INSERT/DELETE/UPDATE) is broadcasted
        const channel = supabase.channel('realtime messages').on( //gives a channel back
            'postgres_changes', 
            {
              event: '*',
              schema: 'public',
              table: 'messages'
            },
            async (payload) => {
                console.log(payload)
                if(payload.eventType === 'DELETE'){
                    const updatedMessages = messages.filter(message => message.id !== payload.old.id)
                    setMessages(updatedMessages)
                }
                if(payload.eventType === 'INSERT'){
                    const messg = payload.new as ActualMessageType;
                    const message_with_user = await getUserAlongWithMessage(messg);
                    // const mwu = await (async()=>{const message_with_user = await getUserAlongWithMessage(messg); return message_with_user})()
                    setMessages([...messages, message_with_user as MessageType])
                }
                if(payload.eventType === 'UPDATE'){
                    //HANDLE UPDATE
                }
            }
          ).subscribe()

          return () => { supabase.removeChannel(channel) }
    }, [supabase, messages, setMessages])

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    },[messages])

    return(
        <>
        <div className="px-4 h-[34rem] overflow-y-scroll z-[20]" style={{ flexDirection: 'column-reverse' }} ref={containerRef}>
            <div>
                {messages.map((m) => (
                    <Message message={m} key={m.id}/>
                ))}
            </div>
        </div>
        </>
    )
}