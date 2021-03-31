import axios from "axios";
import {fileTypes} from "./variables";
import {NextApiRequest} from "next";

export class PizzaRequestsHelper {
    deletePizza(id: number) {
        return new Promise((resolve, reject) => {
            const res = axios.post(`${process.env.API_URL}/pizzas/deletePizza`, {id})
            res.then((data) => {
                resolve(data)
            })

            res.catch((err) => {
                reject(err)
            })
        })
    }
}


export class PizzaDataParser {
    parseData(timeStamp: string, imageTimeStamp: string, req: NextApiRequest) {
        const fs = require('fs')
        const formidable = require('formidable');
        const slugify = require('slugify');
        const path = require('path');

        return new Promise((resolve, reject) => {
            fs.mkdir(`./public/media/${timeStamp}`, {recursive: true}, (err) => {
                if (err) return reject({message: {msg: "Сталась помилка при створенні папки."}})
            })


            const form = formidable({
                uploadDir: `./public/media/${timeStamp}`
            })

            form.keepExtensions = true
            form.keepFileName = true

            form.on("fileBegin", (name, file) => {
                if (!this.validateType(file.type)) {
                    return reject({message: {msg: "Недоступний тип картинки. Спробуйте jpeg або png."}})
                }

                if (file.size >= 1048576) {
                    return reject(({message: {msg: "Завеликий розмір картинки."}}))
                }

                if (this.validateType(file.type) && file.size <=1048576) {
                    file.path = path.join(`public/media/${timeStamp}`, slugify(timeStamp + "_" + imageTimeStamp + '_' + file.name))
                }
            })

            form.parse(req, (err, fields, files) => {
                resolve({fields, files})
            })
        })
    }

    validateType(imageType) {
        return fileTypes.includes(imageType)
    }
}