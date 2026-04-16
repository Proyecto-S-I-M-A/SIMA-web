import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = process.env.DB_URL || ""
console.log("Connecting to database with connection string:", connectionString ? "****" : "No connection string provided")
const sql = postgres(connectionString)

export default sql