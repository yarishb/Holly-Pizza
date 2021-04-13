import {NextApiRequest, NextApiResponse} from "next";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";
import {UserInterface, UserResInterface} from '../../../interfaces/user';

const jwt_decode = require('jwt-decode');

const getUser = async(req: NextApiRequest, res: NextApiResponse) => {
     try {
        const dbManager = new DatabaseManager(db)
        const {id, name} = req.body
        
        let token: string;
        token = id ?? name ?? jwt_decode(req.headers['x-auth-token']).id
        
        const decodedJwt = !!token ? token : id === '' ? name : id
        const from = id === '' ? 'name' : 'id'


        const usersRes: Array<UserResInterface> = await dbManager.findElement("*", "public.users", from, decodedJwt)
        
        if (usersRes.length === 0) {
            return res.status(400).json({msg: "Користувачів не знайдено"})
        }
        

        for (let i = 0, max = Object.keys(usersRes).length; i < max; i++) {
            delete usersRes[i]['password']
            delete usersRes[i]['orders']
        }
        
        res.send(usersRes)
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

export default getUser