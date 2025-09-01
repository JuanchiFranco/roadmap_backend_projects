import type { UserRaw, UserResponse } from "../types/user.js";

export const mapUserRawToResponse = (user: UserRaw): UserResponse => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};
