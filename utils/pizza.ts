import { DataError } from "../interfaces/dataError";
import { NewPizza } from "../interfaces/newPizza";

const moment = require('moment');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const slugify = require('slugify');


export class Pizza {
    public storeImageAndReturnDataFields (req, timeStamp) {
        const imageTimeStamp = moment().format('hh:mm:ss')

        fs.mkdir(`./images/media/${timeStamp}`, {recursive: true}, (err) => {    
            if (err) return {status: 500, msg: "Something went wrong creating the folder."}
        })
        
        const form = formidable({
            multiple: true,
            uploadDir: `./images/media/${timeStamp}`
        })            
            
        
        form.keepExtensions = true
        form.keepFileName = true

        const fileTypes: Array<string> = ['image/jpeg', 'image/png'];
        form.on("fileBegin", (name, file) => {
            if (fileTypes.indexOf(file.type) === -1) {
                return {status: 500, msg: "Unavailable type of image. Try jpeg or png."}
            }
            if (file.size === 0) return {status: 500, msg: "Unavailable to store you image. Try another."}

            file.path = path.join(`images/media/${timeStamp}`, slugify(timeStamp + "_" + imageTimeStamp + '_' +file.name))
        })

        form.parse(req, (err, fields, files) => {    
            return {fields, files}
        })        
    }
}

