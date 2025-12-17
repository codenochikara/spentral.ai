import { pool } from "../../config/PostgreSQLConnection.js";
import { loadSQL } from "../../utils/loadSQL.js";

const createExpensesTable = async () => {
  const queryText = await loadSQL('expenses_table.sql');

  try {
    await pool.query(queryText);
    console.log("Expenses table created successfully.");
  } catch (error) {
    console.error("Error creating expenses table:", error);
  }
};

export default createExpensesTable;
