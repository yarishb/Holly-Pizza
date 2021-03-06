export interface TokenRes {
    data: boolean
}


export interface UserInterface {
    name: string,
    email: string,
    phone: string,
    orders: object,
    is_staff: boolean,
    token: string 
}

export interface UserRes {
    data: UserInterface,

    status: number,
    statusText: string
}