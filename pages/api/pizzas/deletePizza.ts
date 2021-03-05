import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {NextApiRequest, NextApiResponse} from "next";


const deletePizza = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {id} = req.body
        const dbManager = new DatabaseManager(db)

        const row = await dbManager.deleteElement("*", "public.pizzas", "id", id)
        res.json(row)
    } catch (err) {
        return res.json(err)
    }
}

export default deletePizza