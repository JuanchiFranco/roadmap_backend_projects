import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';


export const generateTokens = (userId: number) => {
const accessToken = signAccessToken({ sub: userId });
const refreshToken = signRefreshToken({ sub: userId });
return { accessToken, refreshToken };
};


export const validateRefreshToken = (token: string) => {
return verifyRefreshToken(token);
};