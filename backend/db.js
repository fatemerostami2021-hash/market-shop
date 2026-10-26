// backend/db.js
require('dotenv').config({ quiet: true });
const { Pool, types } = require('pg');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

// BIGINT (type id 20) -> JS number. Safe because prices stay far below 2^53.
types.setTypeParser(20, (value) => parseInt(value, 10));

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('error', (err) => {
  console.error(`${RED}✗ [DB] Unexpected error:${RESET}`, err.message);
});

async function connectDB() {
  try {
    const r = await pool.query('SELECT current_database() AS db');
    console.log(`${GREEN}✓ [DB] Connected to PostgreSQL database "${r.rows[0].db}"${RESET}`);
  } catch (err) {
    console.error(`${RED}✗ [DB] Connection failed:${RESET}`, err.message);
    if (err.code === '3D000') {
      console.error('[DB] Database not found. Check DB_NAME in .env');
    } else if (err.code === '28P01') {
      console.error('[DB] Wrong username or password. Check DB_USER / DB_PASSWORD in .env');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('[DB] PostgreSQL is not running or the port is wrong. Check DB_PORT in .env');
    }
  }
}

module.exports = { pool, connectDB };