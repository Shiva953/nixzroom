'use client'
import { useState,useEffect } from "react";
import supabase from "@/app/lib/db";
import { useSession } from "next-auth/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({weight : "500", subsets: ["latin"]});

export default function Presence(){
    const [onlineUsers, setOnlineUsers] = useState(0);
    const {data:session, status} = useSession()
    const user = session?.user
    useEffect(() => {
		const channel = supabase.channel("room0");
		channel
			.on("presence", { event: "sync" }, () => {
				const userIds = [];
				for (const id in channel.presenceState()) {
					// @ts-ignore
					userIds.push(channel.presenceState()[id][0].user_id);
				}
				setOnlineUsers(Array.from(userIds).length);
			})
			.subscribe(async (status) => {
				if (status === "SUBSCRIBED") {
					await channel.track({
						online_at: new Date().toISOString(),
						user_id: user?.id,
					});
				}
			});
	}, [user]);

    return (
        <div className={roboto.className}>
		<div className="flex items-center gap-1 mb-2">
			<div className="h-4 w-4 bg-green-600 rounded-full animate-pulse"></div>
			<h1 className={`text-sm text-white`}>{onlineUsers} online</h1>
		</div>
        </div>
	);
}