import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {NextApiRequest, NextApiResponse} from "next";


const getPizza = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.body
    const dbManager = new DatabaseManager(db)

    const row = await dbManager.findElement("*", "public.pizzas", "id", id)

    if (row.length === 0) {
        return res.status(400).json({msg: "Pizza with this id does not exist"})
    }

    res.json(row)
}

export default getPizza