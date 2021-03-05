const Pool = require('pg').Pool
import {Config} from '../interfaces/database'

export class Database {
    db: any

    constructor(config: Config) {
        this.connect(config)
    }

    private connect = async ({user, host, database, password, port}) => {
         this.db = await new Pool({
            user,
            host,
            database,
            password,
            port
        })

        return this.db
    }
}


export class DatabaseManager {
    db:any
    rows:any

    constructor(db: any) {
        this.db = db.db
    }

    insertData = async(table, fields, values, data) => {
        await this.db.query(
            `INSERT INTO ${table}(${fields}) VALUES(${values})`,
            data,
        )
    }

    selectData = async(table, select="*") => {
        const rows = await this.db.query(`SELECT ${select} FROM ${table}`)
        return rows.rows
    }

    findElement = async(select = "*", table, condition_key, condition_value) => {
        const {rows} = await this.db.query(
            `SELECT ${select} FROM ${table} WHERE ${condition_key} = $1`,
            [condition_value]
            );

        return rows
    }

    deleteElement = async(select="*", table, condition_key, condition_value)  => {
        await this.db.query(
            `DELETE FROM ${table} WHERE ${condition_key} = $1`,
            [condition_value]
        )

        return "Successfully deleted item"
    }

}