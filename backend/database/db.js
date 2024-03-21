import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  password: "secret",
  host: "localhost",
  port: 5432,
  database: "postgres",
});
