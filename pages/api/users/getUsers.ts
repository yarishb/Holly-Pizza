import { NextApiRequest, NextApiResponse } from "next";
import Helper from "../../../utils/helper";

const getUsers = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const helper = new Helper()
        const rows = await helper.getAllItemsFromTable('public.users', 'id, name, phone, orders, email, is_staff')
        res.json(rows)
    } catch (err) {
        return res.status(500).json(err.msg)
    }
}

export default getUsers