export interface User {
    id: number,
    name: string,
    email: string,
    is_staff: boolean,
    orders: any,
    password: string,
    phone:string
}