import {NextApiRequest, NextApiResponse} from "next";
import {NewPizza} from "../../../interfaces/newPizza";
import Checker from '../../../utils/checkers';
import db from '../../../lib/db';
import {DatabaseManager} from "../../../utils/database";

const moment = require('moment')
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const slugify = require('slugify')

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

            const timeStamp: string = moment().format('DD-MM-YYYY')
            const imageTimeStamp = moment().format('hh:mm:ss')
        
            const fileTypes: Array<string> = ['image/jpeg', 'image/png', 'image/jpg'];
            const validateType = (imageType) => {
                return fileTypes.includes(imageType)
            }
            
            fs.mkdir(`./images/media/${timeStamp}`, {recursive: true}, (err) => {    
                if (err) return res.status(500).json({msg: "Сталась помилка при створенні папки."})  
            })     

            const MainParser = new Promise((resolve, reject) => {
                const form = formidable({
                    multiple: true,
                    uploadDir: `./images/media/${timeStamp}`
                })            
                        
                    
                form.keepExtensions = true
                form.keepFileName = true
    
                form.on("fileBegin", (name, file) => {
                    if (!validateType(file.type)) {
                        return reject({message: {msg: "Недоступний тип картинки. Спробуйте jpeg або png."}})
                    }

                    if (file.size >= 1048576) {
                        return reject(({message: {msg: "Завеликий розмір картинки."}}))
                    }
                    
                    if (validateType(file.type) && file.size <=1048576) {
                        file.path = path.join(`images/media/${timeStamp}`, slugify(timeStamp + "_" + imageTimeStamp + '_' + file.name))
                    }
                })
            
                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err.message)
                    resolve({fields, files})
                })
            })

            MainParser.then((data: NewPizza) => {   
                const image: string = data.files.image.path

                let {name, description, price, category, protein, fat, carbohydrates, weight, size} = data.fields

                const checkedData = checkerClass.createPizzaChecker(image, data.fields)
                if (checkedData.status === false) {
                    return res.status(400).json({msg: checkedData.message})
                }
                  
                dbManager.insertData(
                    "public.pizzas",
                    "image, name, description, price, category, last_update, orders, protein, fat, carbohydrates, weight, size",
                    "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12",
                    [image, name, description, price, category, timeStamp, 0, protein, fat, carbohydrates, weight, size]
                )
            })
            
            MainParser.catch((err) => {
                return res.status(400).json(err.message)
            })

            const data = await dbManager.selectData('public.pizzas')
            res.json(data)
        } catch (err) {
            return console.log(err);
        }  
    } else {
        return res.status(500).json({msg: "Ми дозволяєм тільки  POST запити."})
    }
}


export default createPizzas