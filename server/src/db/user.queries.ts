import pool from "../config/db";
import { User } from "../types/user";

/**
 * Create a new user
 */
export const createUser = async (
  email: string,
  passwordHash: string
): Promise<User> => {
  const query = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, password_hash, created_at;
  `;

  const values = [email, passwordHash];

  const { rows } = await pool.query<User>(query, values);
  return rows[0];
};

/**
 * Find user by email
 */
export const findUserByEmail = async (
  email: string
): Promise<User | null> => {
  const query = `
    SELECT id, email, password_hash, created_at
    FROM users
    WHERE email = $1;
  `;

  const { rows } = await pool.query<User>(query, [email]);
  return rows[0] || null;
};
