import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL is not defined");
}

export const pool = mysql.createPool(process.env.MYSQL_URL);
