import {DatabaseManager} from "../utils/database";
import db from "../lib/db";
import { UserInterface } from "../interfaces/user";
import { Fields } from "../interfaces/newPizza";


interface Error {
    msg: string
}

class Helper {
    dbManager: any
    constructor() {
        this.dbManager = new DatabaseManager(db)
    }


    async getAllItemsFromTable(tableName: string) {
        const rows: Fields[] | UserInterface[] = await this.dbManager.selectData(tableName)
        
        if (rows.length === 0) {
            return {msg: "No elements in database"}
        }

        return rows
    }
}

export default Helper