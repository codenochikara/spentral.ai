import { pool } from '../config/PostgreSQLConnection.js';
import { DatabaseError } from '../utils/errors.js';

export const getDashboardSummary = async (userId) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        COALESCE(
          (SELECT SUM(amount) FROM incomes WHERE user_id = $1), 0
        ) AS total_income,
        COALESCE(
          (SELECT SUM(amount) FROM expenses WHERE user_id = $1), 0
        ) AS total_expenses,
        (SELECT COUNT(*) FROM expenses WHERE user_id = $1) AS expense_count,
        (SELECT COUNT(*) FROM incomes WHERE user_id = $1) AS income_count
      `,
      [userId]
    );

    return rows[0];
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching dashboard summary');
  }
};

export const getRecentTransactions = async (userId, limit) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        id,
        'expense' AS type,
        amount,
        category AS label,
        created_at
      FROM expenses
      WHERE user_id = $1

      UNION ALL

      SELECT
        id,
        'income' AS type,
        amount,
        source AS label,
        created_at
      FROM incomes
      WHERE user_id = $1

      ORDER BY created_at DESC
      LIMIT $2
      `,
      [userId, limit]
    );

    return rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching recent transactions');
  }
};

export const getExpensesByCategory = async (userId) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT category, SUM(amount)::numeric(10,2) AS amount
      FROM expenses
      WHERE user_id = $1
      GROUP BY category
      ORDER BY amount DESC
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error grouping expenses by category');
  }
};

export const getIncomesBySource = async (userId) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT source, SUM(amount)::numeric(10,2) AS amount
      FROM incomes
      WHERE user_id = $1
      GROUP BY source
      ORDER BY amount DESC
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error grouping incomes by source');
  }
};

export const getSpendingTrend = async (userId, range) => {
  let truncUnit = 'day';
  let interval = '30 days';

  if (range === 'week') {
    truncUnit = 'day';
    interval = '7 days';
  }

  if (range === 'month') {
    truncUnit = 'day';
    interval = '30 days';
  }

  if (range === 'year') {
    truncUnit = 'month';
    interval = '12 months';
  }

  const query = `
    SELECT
      DATE_TRUNC('${truncUnit}', created_at) AS date,
      SUM(amount)::numeric(10,2) AS amount
    FROM expenses
    WHERE user_id = $1
      AND created_at >= NOW() - INTERVAL '${interval}'
    GROUP BY date
    ORDER BY date ASC
  `;

  try {
    const { rows } = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching spending trend');
  }
};
