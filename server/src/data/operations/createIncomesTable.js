import { pool } from "../../config/PostgreSQLConnection.js";
import { loadSQL } from "../../utils/loadSQL.js";

const createIncomesTable = async () => {
  const queryText = await loadSQL('incomes_table.sql');

  try {
    await pool.query(queryText);
    console.log("Incomes table created successfully.");
  } catch (error) {
    console.error("Error creating incomes table:", error);
  }
};

export default createIncomesTable;
