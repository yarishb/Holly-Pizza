import {NextApiRequest, NextApiResponse} from "next";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";
import {UserInterface} from '../../../interfaces/user';

const jwt_decode = require('jwt-decode');

const getUser = async(req: NextApiRequest, res: NextApiResponse) => {
     try {
        const dbManager = new DatabaseManager(db)
        const {id} = req.body
        let token: string;
        token = id ?? jwt_decode(req.headers['x-auth-token']).id;
        
        const decodedJwt = token !== undefined ? token : id;
        
        const user: Array<UserInterface> = await dbManager.findElement("*", "public.users", "id", decodedJwt)
        if (user.length === 0) return res.status(400).json({msg: "Ви не ввійшли в свій аккаунт."})    

        res.send({
            name: user[0].name,
            email: user[0].email,
            phone: user[0].phone,
            orders: user[0].orders,
            is_staff: user[0].is_staff,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({err: err.message});
    }
}

export default getUser