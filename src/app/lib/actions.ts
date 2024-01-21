'use server'

import { z } from 'zod'
import supabase from './db';
import { ActualMessageType, User } from './definitions';
import { getServerSession } from 'next-auth';

const FormSchema = z.object({
    mainPart: z.string()
  });

export async function getUserSession(){
    const session = await getServerSession();
    return session;
}

export async function getMessages(){
    const { data } = await supabase.from('messages').select().order('created_at', { ascending: true })
    if(!data){
        throw new Error('Unable to fetch messages from the server')
    }
    const messagesAlongWithUsers = data?.map(
        async (m) => {
            const result = await getUserAlongWithMessage(m);
            return result;
        }
    )
    const finalData = await Promise.allSettled(messagesAlongWithUsers);
    return finalData;
}

export default async function getUserAlongWithMessage(m: ActualMessageType){
    const { data, error } = await supabase.from('users').select().eq('id', m.userIdForThisMessage);
    if (error) {
        console.error('Error fetching user:', error.message);
        }
        const selectedUser = data && data.length > 0 ? data[0] : {id: 6900000000, image:'https://icon-library.com/images/default-profile-icon/default-profile-icon-0.jpg', username:'bhupendar jogi'};
        return { description: m.description, id:m.id, userIdForThisMessage:m.userIdForThisMessage, created_at: m.created_at, userM: {username: selectedUser.username, image: selectedUser.image, id: selectedUser.id}}
}

export async function sendMessage(userId:number, username:string, image:string, formData: FormData){
    const { mainPart } = FormSchema.parse({
        mainPart: formData.get('mainPart')
    })

    //adding message
    const { data, error } = await supabase
    .from('messages')
    .insert([
    { description: mainPart==='' ? " " : mainPart, userIdForThisMessage: userId },
    ])
    if(error){
        console.log(error)
    }
    //adding user to users database
    const { data: users, error: error_new } = await supabase
    .from('users')
    .insert([
    { id: userId, username: username, image: image}, 
    ])
    if(error_new){
        console.log(error)
    }

}

export async function deleteMessage(messageId: number){
    const { data, error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId)
    if(error){
        console.log(error)
        return null;
    }
    return data;
}