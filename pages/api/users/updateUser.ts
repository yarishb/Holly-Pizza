import {NextApiRequest, NextApiResponse} from "next";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";

const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const dbManager = new DatabaseManager(db)
        

    } catch (err) {
        return res.json(err.message)
    }
}

export default updateUser