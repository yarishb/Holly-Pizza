import {NextApiRequest, NextApiResponse} from "next";
import {NewPizza} from "../../../interfaces/newPizza";
import Checker from '../../../utils/checkers';
import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";


const checkerClass = new Checker
const createPizzas = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const newPizza: NewPizza = req.body
            const {image, name, description, price, category, orders} = newPizza

            const checkedData = checkerClass.createPizzaChecker(newPizza)
            if (checkedData.status === false) {
                return res.status(400).json({msg: checkedData.message})
            }


            const timeStamp = Date.now().toString()
            const dbManager = new DatabaseManager(db)
            dbManager.insertData(
                "public.pizzas",
                "image, name, description, price, category, last_update, orders",
                "$1, $2, $3, $4, $5, $6, $7",
                [image, name, description, price, category, timeStamp, orders]
            )

            const rows = await dbManager.selectData("public.pizzas")
            return res.json(rows)
        } catch (err) {
            return res.json(err.message)
        }
    } else {
        res.status(500).json({msg: "We support only POST requests for creating a pizza."})
    }
}


export default createPizzas