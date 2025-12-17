import { pool } from "../../config/PostgreSQLConnection.js";
import { loadSQL } from "../../utils/loadSQL.js";

const createUsersTable = async () => {
  const queryText = await loadSQL('users_table.sql');

  try {
    await pool.query(queryText);
    console.log("Users table created successfully.");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

export default createUsersTable;
