import {NextApiRequest, NextApiResponse} from "next";
import {Signup} from "../../../interfaces/signup";
import Checker from "../../../utils/checkers";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";
const bcrypt = require('bcryptjs');


const signup = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const checker = new Checker()
        const dbManager = new DatabaseManager(db)
        let {email, password, confirmPassword, name, is_staff, phone}: Signup = req.body
        if (!email || !password || !confirmPassword || !name || !phone) return res.status(400).json({msg: "Not all fields have been filled."})

        const passwordCheck: string = checker.passwordChecker(password, confirmPassword)
        if (passwordCheck !== "") return res.status(400).json({msg: passwordCheck})

        const existingUserByEmail = await dbManager.findElement("*", "public.users", "email", email)
        const existingUserByPhone = await dbManager.findElement("*", "public.users", "phone", phone)

        if (existingUserByEmail.length === 1) return res.status(400).json({msg: "User with this email already exists."})
        if (existingUserByPhone.length === 1) return res.status(400).json({msg: "User with this phone number already exists."})



        const salt: string = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        name = name.charAt(0).toUpperCase() + name.slice(1);
        const user = dbManager.insertData(
            'public.users',
            'email, password, name, phone, is_staff, orders',
            '$1, $2, $3, $4, $5, $6',
            [email, passwordHash, name, phone, is_staff, {}])

        const userDataToRes = {
            email,
            name,
            phone
        }
        res.json(userDataToRes)
    } catch (err) {

    }
}

export default signup