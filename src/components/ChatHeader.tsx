import Presence from "./Presence";

export default function ChatHeader(){

    return(
        <div className="flex flex-col items-center justify-center w-full mt-8">
        <h2 className="text-2xl font-bold mb-2 items-center justify-center">Chat Messages</h2>
        <Presence/>
        </div>
    )
}