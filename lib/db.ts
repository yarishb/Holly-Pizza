import {Database} from '../utils/database'
import {config} from '../interfaces/database'

const db_config: config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}


const db = new Database(db_config)
export default db