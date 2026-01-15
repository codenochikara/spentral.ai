import { pool } from "../config/PostgreSQLConnection.js";
import { DatabaseError } from '../utils/errors.js';

export const createIncome = async (userId, amount, source, description, notes) => {
  try {
    const result = await pool.query(
      "INSERT INTO incomes (user_id, amount, source, description, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, amount, source, description, notes]
    );
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError("Failed to create income", error);
  }
};

export const getIncomesByUserId = async (userId, limit = 10) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incomes WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2",
      [userId, limit]
    );
    return result.rows;
  } catch (error) {
    throw new DatabaseError("Failed to fetch incomes", error);
  }
};

export const updateIncomeById = async (id, amount, source, description, notes) => {
  // Partial (single-field) update implementation - read-modify-write pattern
  try {
    const existingIncome = await pool.query("SELECT * FROM incomes WHERE id = $1", [id]);
    const existing = existingIncome.rows[0];
    if (!existing) {
      return null;
    }
    const updatedAmount = amount !== undefined ? amount : existing.amount;
    const updatedSource = source !== undefined ? source : existing.source;
    const updatedDescription = description !== undefined ? description : existing.description;
    const updatedNotes = notes !== undefined ? notes : existing.notes;
    const result = await pool.query(
      "UPDATE incomes SET amount = $1, source = $2, description = $3, notes = $4 WHERE id = $5 RETURNING *",
      [updatedAmount, updatedSource, updatedDescription, updatedNotes, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError("Failed to update income", error);
  }
};

export const deleteIncomeById = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM incomes WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows.length;
  } catch (error) {
    throw new DatabaseError("Failed to delete income", error);
  }
};
