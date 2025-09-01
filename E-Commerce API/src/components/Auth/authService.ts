import { findUserByEmail, createUser, findUserById, updateUserRefreshToken } from "./authRepository.js";
import { hashPassword, comparePasswords } from "../../utils/bcrypt.js";
import { generateTokens, validateRefreshToken } from "../../utils/tokens.js";

export const registerUser = async (email: string, name: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(password);
  const userCreated = await createUser(email, name, hashedPassword);
  const { accessToken, refreshToken } = generateTokens(userCreated.id);
  await updateUserRefreshToken(userCreated.id, refreshToken);
  
  return {
    success: true,
    user: userCreated,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  await updateUserRefreshToken(user.id, refreshToken);

  return {
    success: true,
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};
