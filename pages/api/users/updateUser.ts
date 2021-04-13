import {NextApiRequest, NextApiResponse} from "next";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";

const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const dbManager = new DatabaseManager(db)
            const {fields, id} = req.body
            dbManager.updateElement('public.users', fields, 'id', id)
            res.json(true)
        } catch (err) {
            console.log(err);
            
            return res.json(err.message)
        }
    }
}

export default updateUser