import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {NextApiRequest, NextApiResponse} from "next";


const deletePizza = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.body
    const dbManager = new DatabaseManager(db)

    const row = await dbManager.deleteElement("*", "public.pizzas", "id", id)
    res.json(row)
}

export default deletePizza