import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "admin",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "test_db",
});
