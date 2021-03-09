import Axios from "axios";
import {TokenRes, UserRes} from "../interfaces/userManager";


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
}


export default User