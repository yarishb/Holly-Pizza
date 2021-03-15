import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {NextApiRequest, NextApiResponse} from "next";


const getPizza = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {id, name} = req.body

        const selector = id === '' ? name : id
        const from = id === '' ? 'name' : 'id'
        console.log(selector, from);
        
        const dbManager = new DatabaseManager(db)
        const row = await dbManager.findElement("*", "public.pizzas", from, selector)
        
        if (row.length === 0) {
            return res.status(400).json({msg: "Піци з таким id не знайдено."})
        }    
        console.log(row);
        
        res.json(row)
    } catch (err) {
        return res.json(err)
    }
}

export default getPizza