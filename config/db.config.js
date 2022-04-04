import dotenv from "dotenv"
import {Sequelize} from 'sequelize'

dotenv.config()

const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD || ""
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

const devConnection = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const prodConnection = process.env.DATABASE_URL

const db = new Sequelize(process.env.NODE_ENV === "production" ? prodConnection : devConnection);

export default db