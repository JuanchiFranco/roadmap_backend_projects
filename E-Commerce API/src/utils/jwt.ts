import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * Firma un access token con la clave configurada.
 * payload típicamente contiene { sub: userId } u otros claims mínimos.
 */
export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: String(config.jwt.accessExpiration),
  });
};

/**
 * Firma un refresh token con la clave configurada.
 */
export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: String(config.jwt.refreshExpiration),
  });
};

/**
 * Verifica un access token y devuelve el payload (lanza si inválido/expirado).
 */
export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
};

/**
 * Verifica un refresh token y devuelve el payload (lanza si inválido/expirado).
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
};