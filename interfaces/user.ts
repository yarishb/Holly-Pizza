export interface UserInterface {
    id: number,
    name: string,
    email: string,
    is_staff: boolean,
    orders: any,
    password?: string,
    phone:string
}

export interface UserResInterface {
    id: number,
    name: string,
    email: string,
    is_staff: boolean,
    orders: any,
    phone:string
}

export interface InputInterface {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    is_staff: boolean
}

export interface DisplayUserInterface extends UserInterface {

}