import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {NextApiRequest, NextApiResponse} from "next";


const getPizzas = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const dbManager = new DatabaseManager(db)
        const rows = await dbManager.selectData("public.pizzas")

        if (rows.length === 0) {
            return res.status(400).json({msg: "No elements in database"})
        }

        res.json(rows)
    } catch (err) {
        return res.json(err)
    }
}

export default getPizzas