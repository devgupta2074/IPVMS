import pg from "pg";
const { Pool } = pg;
export const pool = new Pool({
  user: "root",
  password: "xsRLlDQJnsniVeJTF1MUDbUCZxyXSQQl",
  host: "dpg-co2h7bgl6cac73bnjcpg-a.singapore-postgres.render.com",
  port: 5432,
  database: "ipvms",
  ssl: true,
});
