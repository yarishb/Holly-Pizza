import {DatabaseManager} from "../utils/database";
import db from "../lib/db";
import { UserInterface } from "../interfaces/user";
import { Fields } from "../interfaces/newPizza";


class Helper {
    dbManager: any
    constructor() {
        this.dbManager = new DatabaseManager(db)
    }


    async getAllItemsFromTable(tableName: string, select: string) {
        const rows: Fields[] | UserInterface[] = await this.dbManager.selectData(tableName, select)
        
        if (rows.length === 0) {
            return {msg: "No elements in database"}
        }

        return rows
    }
}

export default Helper