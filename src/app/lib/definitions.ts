export type MessageType = {
    id : number,
    description: string,
    created_at: Date
    userIdForThisMessage: number
    userM: {
        username: string,
        image: string,
        id: number
    }
}

export type ActualMessageType = {
    id : number,
    description: string,
    created_at: Date
    userIdForThisMessage: number
}

export type User = {
    id: number,
    username: string,
    image: string,
    created_at: string
}