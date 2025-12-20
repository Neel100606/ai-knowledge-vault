import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../db/user.queries';
import { User } from '../types/user';

export const signup = async (email: string, password: string): Promise<Omit<User, "password_hash">> => {
    // 1. Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    // 2. Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Create user
    const user = await createUser(email, passwordHash);

    // 4. Remove password_hash before returning
    const { password_hash, ...safeUser } = user;

  return safeUser;
};

export const login = async (email: string, password: string): Promise<Omit<User, "password_hash">> => {
  // 1. Find user
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // 3. Remove password_hash
  const { password_hash, ...safeUser } = user;

  return safeUser;
};
