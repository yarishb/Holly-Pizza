import {NextApiRequest, NextApiResponse} from "next";
const jwt = require('jsonwebtoken');

const validToken = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.headers['x-auth-token']
        if (!token) return res.json(false)

        const verified: boolean = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false)

        return res.json(true)
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
}

export default validToken