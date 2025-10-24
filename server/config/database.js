import pg from "pg";

const useSSL = process.env.PGHOST && process.env.PGHOST.includes("render.com");

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: useSSL ? { rejectUnauthorized: false } : false
};

export const pool = new pg.Pool(config);
