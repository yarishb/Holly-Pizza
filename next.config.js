require('dotenv').config()

module.exports = {
    env: {
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        JWT_SECRET: process.env.JWT_SECRET
    }
}