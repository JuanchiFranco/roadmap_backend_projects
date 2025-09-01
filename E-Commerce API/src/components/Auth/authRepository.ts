import prisma from "../../config/db.js";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (email: string, name: string, hashedPassword: string) => {
  return prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
};

export const updateUserRefreshToken = async (id: number, refreshToken: string) => {
  return prisma.user.update({
    where: { id },
    data: { refreshToken },
  });
};
