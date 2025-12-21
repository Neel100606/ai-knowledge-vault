import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../db/user.queries';
import { User } from '../types/user';
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export const signup = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash);

  const { password_hash, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),

  };
};


export const login = async (
  email: string,
  password: string
) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const { password_hash, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),
  };
};

