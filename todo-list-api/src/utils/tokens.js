import jwt from 'jsonwebtoken';
import 'dotenv/config';
const SECRET_KEY = process.env.JWT_SECRET;
const SECRET_KEY_REFRESH = process.env.JWT_SECRET_REFRESH;

function generateToken(user, isRefresh = false) {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, isRefresh ? SECRET_KEY_REFRESH : SECRET_KEY, {
        expiresIn: isRefresh ? '7d' : '1h'
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

function verifyTokenRefresh(token) {
    try {
        return jwt.verify(token, SECRET_KEY_REFRESH);
    } catch (error) {
        return null;
    }
}

export { generateToken, verifyToken, verifyTokenRefresh };
