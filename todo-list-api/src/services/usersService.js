import { prisma } from '../config/db.js';
import { generateToken, verifyTokenRefresh } from '../utils/tokens.js';
import { encryptPassword, comparePasswords } from '../utils/helpers.js';

async function register({ name, email, password }) {
    const hashedPassword = await encryptPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
    
    if (!user) return { success: false, message: 'Error al registrar el usuario' };

    const token = generateToken(user);
    return { success: true, token };
}

async function login({ email, password }) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) return { success: false, message: 'Credenciales inválidas' };

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) return { success: false, message: 'Credenciales inválidas' };

    const token = generateToken(user);
    const tokenRefresh = generateToken(user, true);
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokenRefresh }
    });
    return { success: true, token, tokenRefresh };
}

async function refreshTokens(refreshToken) {
    const verifiedToken = verifyTokenRefresh(refreshToken);
    
    if (!verifiedToken) {
        return { success: false, message: 'Token de actualización inválido' };
    }

    const user = await prisma.user.findUnique({
        where: { id: verifiedToken.id }
    });

    if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
    }

    const token = generateToken(user);
    return { success: true, token };
}

export { register, login, refreshTokens };
