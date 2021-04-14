import {NextApiRequest, NextApiResponse}  from "next";
import Helper from "../../../utils/helper";

const getPizzas = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const helper = new Helper()
        const rows = await helper.getAllItemsFromTable('public.pizzas', '*' )

        res.json(rows)
    } catch (err) {
        return res.json(err)
    }
}

export default getPizzas