import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectPostgreSQL = async () => {
  try {
    await pool.connect();
    console.log('✅ Connected to 🐘 PostgreSQL');
  } catch (error) {
    console.error('❌ Error connecting to 🐘 PostgreSQL:', error);
  }
}

export default connectPostgreSQL;
