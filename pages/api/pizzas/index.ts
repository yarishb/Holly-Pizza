import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {NextApiRequest, NextApiResponse} from "next";


const getPizza = async (req: NextApiRequest, res: NextApiResponse) => {
    const dbManager = new DatabaseManager(db)
    const rows = await dbManager.selectData("public.pizzas")

    if (rows.length === 0) {
        return res.status(400).json({msg: "No elements in database"})
    }

    res.json(rows)
}

export default getPizza