import {NextApiRequest, NextApiResponse} from "next";
import {Signup} from "../../../interfaces/signup";
import Checker from "../../../utils/checkers";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";
import Axios from "axios";
import signin from "./signin";
import { UserInterface } from "../../../interfaces/user";
const bcrypt = require('bcryptjs');


const signup = async(req: NextApiRequest, res: NextApiResponse)=> {
    try {
        const checker = new Checker()
        const dbManager = new DatabaseManager(db)
        let {email, password, confirmPassword, name, is_staff, phone}: Signup = req.body
        if (!email || !password || !confirmPassword || !name || !phone) return res.status(400).json({msg: "Введіть всі поля."})

        const passwordCheck: string = checker.passwordChecker(password, confirmPassword)
        if (passwordCheck !== "") return res.status(400).json({msg: passwordCheck})

        const existingUserByEmail: Array<UserInterface> = await dbManager.findElement("*", "public.users", "email", email)
        const existingUserByPhone: Array<UserInterface> = await dbManager.findElement("*", "public.users", "phone", phone)

        if (existingUserByEmail.length === 1) return res.status(400).json({msg: "Користувач з даною поштою вже існує."})
        if (existingUserByPhone.length === 1) return res.status(400).json({msg: "Користувач з даним номером телефону вже існує."})


        const salt: string = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        name = name.charAt(0).toUpperCase() + name.slice(1);
        await dbManager.insertData(
            'public.users',
            'email, password, name, phone, is_staff, orders',
            '$1, $2, $3, $4, $5, $6',
            [email, passwordHash, name, phone, is_staff, {}])

        const response = await signin(req, res)
        res.json(response)
    } catch (err) {

    }
}

export default signup