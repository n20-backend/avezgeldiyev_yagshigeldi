import pkg from "pg";
import dotenv from 'dotenv';
const { Pool } = pkg;

// .env faylini yuklash
dotenv.config();

// PostgreSQL ulanishi
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Ulanishni tekshirish
pool.connect()
  .then(() => console.log("Connected to PostgreSQL successfully!"))
  .catch(err => console.error("Connection error:", err));

export default pool;
