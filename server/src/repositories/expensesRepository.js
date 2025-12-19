import { pool } from "../config/PostgreSQLConnection.js";
import { DatabaseError } from '../utils/errors.js';

export const createExpense = async (userId, amount, category, description, notes) => {
  try {
    const result = await pool.query(
      "INSERT INTO expenses (user_id, amount, category, description, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, amount, category, description, notes]
    );
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(error, "Error creating expense");
  }
};

export const getExpensesByUserId = async (userId, limit = 10) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM expenses
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
      `,
      [userId, limit]
    );
    return result.rows;
  } catch (error) {
    throw new DatabaseError(error, "Error fetching expenses");
  }
};

export const updateExpenseById = async (id, amount, category, description, notes) => {
  // Partial (single-field) update implementation - read-modify-write pattern
  try {
    const existingExpense = await pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
    const existing = existingExpense.rows[0];
    if (!existing) {
      return null;
    }
    const updatedAmount = amount !== undefined ? amount : existing.amount;
    const updatedCategory = category !== undefined ? category : existing.category;
    const updatedDescription = description !== undefined ? description : existing.description;
    const updatedNotes = notes !== undefined ? notes : existing.notes;
    const result = await pool.query(
      "UPDATE expenses SET amount = $1, category = $2, description = $3, notes = $4 WHERE id = $5 RETURNING *",
      [updatedAmount, updatedCategory, updatedDescription, updatedNotes, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(error, "Error updating expense");
  }
};

export const deleteExpenseById = async (id) => {
  try {
    const result = await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
    return result.rowCount; // Return number of rows deleted
  } catch (error) {
    throw new DatabaseError(error, "Error deleting expense");
  }
};
