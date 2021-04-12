import {NextApiRequest, NextApiResponse} from "next";
import { NewPizza, TimeStamp } from "../../../interfaces/newPizza";
import db from "../../../lib/db";
import { DatabaseManager } from "../../../utils/database";
import {PizzaDataParser} from "../../../utils/pizza";
const fs = require('fs');
const moment = require('moment');

export const config = {
    api: {
        bodyParser: false
    }
}

const updatePizza = async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {        
        try {
            const parseHelper = new PizzaDataParser()
            const dbManager = new DatabaseManager(db)

            const {timeStamp, imageTimeStamp}: TimeStamp = parseHelper.getTimeStampAndPizzaTimeStamp()

            fs.mkdir(`./public/media/${timeStamp}`, {recursive: true}, (err) => {
                if (err) return res.status(400).json({msg: "Сталась помилка при створенні папки."})
            })
            
            const parsedData = parseHelper.parseData(timeStamp, imageTimeStamp, req)

            parsedData.then((data: NewPizza) => {
                let {id, image, categories} = data.fields

                const fieldsToUpdate = {}
                fieldsToUpdate['categories'] = categories.split(',')

                if (Object.keys(data.files).length !== 0) {
                    const filePath = data.files.file.path
                    const image: string = filePath.slice(6, filePath.length)
                    fieldsToUpdate['image'] = image
                }

                Object.keys(data.fields).forEach((name: string) => {
                    if (name !== 'id' && name !== 'file' && name !== 'categories' && name !== 'image') {
                        fieldsToUpdate[name] = data.fields[name]
                    }
                })

                dbManager.updateElement("public.pizzas", fieldsToUpdate, "id", id)
                res.json(data)
            })


            parsedData.catch((err) => {
                return res.status(400).json(err.message)
            })
        } catch (err) {
            console.log(err)
        }
    } else {
        return res.status(500).json({msg: "Ми дозволяєм тільки  PUT запити."})
    }
}


export default updatePizza