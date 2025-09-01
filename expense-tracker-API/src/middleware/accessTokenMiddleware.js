import { verifyToken } from "../utils/tokens.js";

const accessTokenMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid access token' });
    }

    req.user = decoded;
    next();
};

export default accessTokenMiddleware;
