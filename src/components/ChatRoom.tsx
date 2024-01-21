import { getMessages } from "@/app/lib/actions"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import { MessageType } from "@/app/lib/definitions"
export const dynamic = 'force-dynamic'

export default async function ChatRoom(){
    const messages = await getMessages();
    const data = messages.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
            console.error('Error fetching message:', result.reason.message);
            return null;
        }
    }) as MessageType[];
    return (
        <>
        <div className="border-white mt-[-8rem] rounded-[10px] border-2">
        {/* <span className="glow"></span> */}
			{/* <div className="inner"> */}
            <ChatHeader/>
            <ChatMessages serverMessages={data ?? []}/>
            <ChatInput/>
            </div>
            {/* </div> */}
            {/* </BackgroundGradient> */}
            </>
    )
}