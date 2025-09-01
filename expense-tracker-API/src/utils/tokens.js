import jwt from 'jsonwebtoken';
process.loadEnvFile();

const { JWT_SECRET } = process.env;
const { JWT_EXPIRATION } = process.env;
const { JWT_REFRESH_SECRET } = process.env;
const { JWT_REFRESH_EXPIRATION } = process.env;

export const generateToken = (user, isRefresh = false) => {
    return jwt.sign({ id: user.id, email: user.email }, isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET, {
        expiresIn: isRefresh ? JWT_REFRESH_EXPIRATION : JWT_EXPIRATION
    });
}

export const verifyToken = (token, isRefresh = false) => {
    try {
        return jwt.verify(token, isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}