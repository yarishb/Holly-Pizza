import {NextApiRequest, NextApiResponse} from "next";
import {NewPizza, TimeStamp} from "../../../interfaces/newPizza";
import Checker from '../../../utils/checkers';
import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";
import {PizzaDataParser} from "../../../utils/pizza";


const fs = require('fs')

export const config = {
    api: {
        bodyParser: false
    }
}

const createPizzas = async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const dbManager = new DatabaseManager(db)
            const checkerClass = new Checker
            const parseHelper = new PizzaDataParser()
            const {timeStamp, imageTimeStamp}: TimeStamp = parseHelper.getTimeStampAndPizzaTimeStamp()

            fs.mkdir(`./public/media/${timeStamp}`, {recursive: true}, (err) => {
                if (err) return res.status(400).json({msg: "Сталась помилка при створенні папки."})
            })

            const parsedFields = parseHelper.parseData(timeStamp, imageTimeStamp, req)

            parsedFields.then((data: NewPizza) => {            
                const filePath = data.files.file.path
                const image: string = filePath.slice(6, filePath.length)

                let {name, description, price, categories, protein, fat, carbohydrates, weight, size} = data.fields
                categories = categories.split(',')
                const checkedData = checkerClass.createPizzaChecker(image, data.fields)
                if (checkedData.status === false) {
                    return res.status(400).json({msg: checkedData.message})
                }
                  
                dbManager.insertData(
                    "public.pizzas",
                    "image, name, description, price, categories, last_update, orders, protein, fat, carbohydrates, weight, size",
                    "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12",
                    [image, name, description, price, categories, timeStamp, 0, protein, fat, carbohydrates, weight, size]
                )

                dbManager.selectData('public.pizzas').then(data => {
                    res.json(data)
                })
            })
            
            parsedFields.catch((err) => {
                return res.status(400).json({msg: err.message})
            })

        } catch (err) {
            return console.log(err);
        }  
    } else {
        return res.status(500).json({msg: "Ми дозволяєм тільки  POST запити."})
    }
}


export default createPizzas