import Axios from "axios";
import { InputInterface } from "../interfaces/user";
import {TokenRes, UserRes} from "../interfaces/userManager";

interface signInData {
    email: string,
    password: string
}


class User {
    async checkLogged () {
        let token: string | null = localStorage.getItem('x-auth-token')

        if (token === null) {
            localStorage.setItem('x-auth-token', "")
            token = ''
        }

        const tokenRes: TokenRes = await Axios.post(
            `${process.env.API_URL}/users/validToken`,
            null, {headers: {'x-auth-token': token}}
        )


        let userRes: UserRes | undefined = undefined
        if (tokenRes.data) {
             userRes = await Axios.get(
				`${process.env.API_URL}/users/`,
				{headers: {'x-auth-token': token}}
			)
        }
        return userRes
    }


    async sign (path: string, data: InputInterface | signInData) {
        try {
            const res: UserRes = await Axios.post(`${process.env.API_URL}/users/${path}`, data)
            localStorage.setItem('x-auth-token', res.data.token)
            return res
        } catch (err) {
            return err.response
        }
    }
}


export default User