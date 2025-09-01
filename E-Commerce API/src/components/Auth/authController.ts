import type { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from "./authService.js";
import config from '../../config/config.js';
import { mapUserRawToResponse } from '../../utils/mappers.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, name, password } = req.body;
        const result = await registerUser(email, name, password);
        if(!result.success){
            return res.status(400).json(result);
        }

        res.cookie("refreshToken", result.tokens.refreshToken, { 
            httpOnly: true,
            sameSite: 'lax',
            secure: config.cookie.secure,
            domain: config.cookie.domain, 
        });
        result.user = mapUserRawToResponse(result.user);
        res.status(201).json(result);
    }catch(err){
        next(err);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        if (!result.success) {
            return res.status(400).json(result);
        }

        res.cookie("refreshToken", result.tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: config.cookie.secure,
            domain: config.cookie.domain,
        });
        result.user = mapUserRawToResponse(result.user);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
