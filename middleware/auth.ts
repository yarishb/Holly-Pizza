import {NextApiRequest, NextApiResponse} from "next";

const jwt = require('jsonwebtoken')

const auth = (req: NextApiRequest, res: NextApiResponse, next) => {
   try {
       const token = req.headers['x-auth-token']
       const verified = jwt.verify(token, process.env.JWT_SECRET)

       if (!token) return res.status(400).json({msg: "No authentication token, access authentication denied."})
       if (!verified) return res.status(400).json({msg: "Verification failed, authentication denied."})

       req.user = verified.id
       next()
   } catch (err) {
       return res.status(500).json({msg: err.message})
   }
}

module.exports = auth