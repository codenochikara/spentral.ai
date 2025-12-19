import { pool } from '../config/PostgreSQLConnection.js';
import { DatabaseError } from '../utils/errors.js';

export const getDashboardSummary = async (userId) => {
  try {
    const result = await pool.query(
      `
      SELECT
        COALESCE(SUM(amount), 0) AS total_expenses,
        COUNT(*) AS expense_count
      FROM expenses
      WHERE user_id = $1
      `,
      [userId]
    );

    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching dashboard summary');
  }
};

export const getExpensesByCategory = async (userId) => {
  try {
    const result = await pool.query(
      `
      SELECT category, SUM(amount)::numeric(10,2) AS amount
      FROM expenses
      WHERE user_id = $1
      GROUP BY category
      ORDER BY amount DESC
      `,
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error grouping expenses by category');
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
      DATE_TRUNC('${truncUnit}', created_at) AS trunc_date,
      SUM(amount)::numeric(10,2) AS amount
    FROM expenses
    WHERE user_id = $1
      AND created_at >= NOW() - INTERVAL '${interval}'
    GROUP BY trunc_date
    ORDER BY trunc_date ASC
  `;

  try {
    const { rows } = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching spending trend');
  }
};
