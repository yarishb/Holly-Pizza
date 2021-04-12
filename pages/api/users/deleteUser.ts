import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db";
import {DatabaseManager} from "../../../utils/database";


const deleteUser = async(req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.body
    const dbManager = new DatabaseManager(db)
    const row = await dbManager.deleteElement("*", "public.users", "id", id)
    
    res.json(row)
}

export default deleteUser