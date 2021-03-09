import {NextApiRequest, NextApiResponse} from "next";
import {Signin} from "../../../interfaces/signin";
import {DatabaseManager} from "../../../utils/database";
import db from "../../../lib/db";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const signin = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const dbManager = new DatabaseManager(db)
        let {email, password}: Signin = req.body
        if (!email || !password) return res.status(400).json({msg: "Not all fields have been entered."})

        const user = await dbManager.findElement("*", "public.users", "email", email)
        if (user.length === 0) return res.status(400).json({msg: "This account does not exist. Try to register."})

        const ifMatch: boolean = await bcrypt.compare(password, user[0].password)
        if (!ifMatch) return res.status(400).json({msg: "Your password doesn't match."})

        const token = jwt.sign({id: user[0].id}, process.env.JWT_SECRET)
        const resData = {
            token,
            user: {
                name: user[0].name,
                email: user[0].email,
                orders: user[0].orders,
                phone: user[0].phone,
                is_staff: user[0].is_staff
            }
        }

        res.json(resData)
        return resData
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
}

export default signin