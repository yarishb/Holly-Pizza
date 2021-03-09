export interface TokenRes {
    data: boolean
}

export interface UserRes {
    data: {
        name: string,
        email: string,
        phone: string,
        orders: object,
        is_staff: boolean
    },

    status: number,
    statusText: string
}