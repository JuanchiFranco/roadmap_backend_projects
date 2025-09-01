import prisma from "../config/db.js";
import { encryptPassword, comparePasswords } from "../utils/helper.js";
import { generateToken } from "../utils/tokens.js";

const authService = {
    register: async (name, email, password) => {
        const hashedPassword = await encryptPassword(password);

        const result = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
            });

            const token = generateToken(user);
            const refreshToken = generateToken(user, true);

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    refreshToken
                }
            });

            return { user, token, refreshToken };
        });

        const { user, token, refreshToken } = result;

        return {
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token,
                refreshToken
            }
        }
    },
    login: async (email, password) => {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }

        const token = generateToken(user);
        const refreshToken = generateToken(user, true);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        return {
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token,
                refreshToken
            }
        };
    },
    logout: async (userId) => {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null }
        });

        return {
            success: true,
            message: "Logout successful"
        };
    }
};

export default authService;
