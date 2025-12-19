import bcrypt from 'bcrypt';
import { pool } from "../config/PostgreSQLConnection.js";
import { DatabaseError } from '../utils/errors.js';

export const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at, updated_at',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(error, 'Error creating user');
  }
}

export const updateUserById = async (id, username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 returning id, username, email',
      [username, email, hashedPassword, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(error, 'Error updating user');
  }
}

export const getAllUsers = async () => {
  try {
    const result = await pool.query(
      'SELECT id, username, email FROM users'
    );
    return result.rows;
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching users');
  }
}

export const getUserById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [id]
    );
    /* if (result.rows.length === 0) {
      throw new NotFoundError(null, 'User not found');
    } */
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching user');
  }
}

export const checkDuplicateUser = async (username, email) => {
  try {
    const isDuplicate = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    return isDuplicate.rows.length > 0;
  } catch (error) {
    // console.error(error);
    throw new DatabaseError(error, 'Error checking duplicate user');
  }
}

/* export const deleteUser = async (id) => {
  await pool.query(
    'DELETE FROM users WHERE id = $1',
    [id]
  );
} */

export const getUserByIdentifier = async (identifier) => {
  const query = `
    SELECT id, username, email, password
    FROM users
    WHERE username = $1 OR email = $1
    LIMIT 1
  `
  try {
    const foundUser = await pool.query(query, [identifier]);
    return foundUser.rows[0] || null;
  } catch (error) {
    throw new DatabaseError(error, 'Error finding user');
  }
}

export const updateRefreshToken = async (username, refreshToken) => {
  const query = `
    UPDATE users
    SET refresh_token = $1
    WHERE username = $2
  `;
  await pool.query(query, [refreshToken, username]);
};

export const getUserByRefreshToken = async (refreshToken) => {
  const query = `
    SELECT username, email, id
    FROM users
    WHERE refresh_token = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [refreshToken]);
  return rows[0] || null;
};

export const clearRefreshToken = async (userId) => {
  const query = `
    UPDATE users
    SET refresh_token = NULL
    WHERE id = $1
  `;
  await pool.query(query, [userId]);
};
