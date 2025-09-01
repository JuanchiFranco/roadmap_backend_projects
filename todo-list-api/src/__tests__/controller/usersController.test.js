import { describe, it, jest } from '@jest/globals';

const mockRegisterUser = jest.fn();
const mockLoginUser = jest.fn();
const mockRefreshTokens = jest.fn();

jest.unstable_mockModule('../../services/usersService.js', () => ({
  register: mockRegisterUser,
  login: mockLoginUser,
  refreshTokens: mockRefreshTokens,
}));

const { registerUser, loginUser, refreshToken } = await import("../../controllers/usersController");

describe('registerUser function', () => {
    beforeEach(() => {
        jest.resetModules(); // Borra la caché de imports
        jest.clearAllMocks(); // Limpia los mocks
    });

    it('should register a user and return a token', async () => {
        const mockTokenUser = { success: true, token: 'mockToken' };
        mockRegisterUser.mockResolvedValueOnce(mockTokenUser);

        const req = {
            body: { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await registerUser(req, res);

        expect(mockRegisterUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ token: mockTokenUser.token });
    });

    it('should return status 400 when required fields are missing', async () => {
        const req = {
            body: { name: 'John Doe', email: '', password: 'password123' } // Missing email
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Todos los campos son obligatorios' });
    });

    it('should return status 409 when email is already in use', async () => {
        const mockError = { code: 'P2002' };
        mockRegisterUser.mockRejectedValueOnce(mockError);
        const req = {
            body: { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico ya está en uso' });
    });

    it('should return status 500 on internal server error', async () => {
        const mockError = new Error('Internal Server Error');
        mockRegisterUser.mockRejectedValueOnce(mockError);
        const req = {
            body: { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });

    it('should return status 400 when service returns success false', async () => {
        mockRegisterUser.mockResolvedValueOnce({ success: false, message: 'Error al registrar el usuario' });
        const req = {
            body: { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al registrar el usuario' });
    });
});

describe('loginUser function', () => {
    beforeEach(() => {
        jest.resetModules(); // Borra la caché de imports
        jest.clearAllMocks(); // Limpia los mocks
    });

    it('should login a user and return a token', async () => {
        const mockTokenUser = { success: true, token: 'mockToken' };
        mockLoginUser.mockResolvedValueOnce(mockTokenUser);

        const req = {
            body: { email: 'john.doe@example.com', password: 'password123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await loginUser(req, res);

        expect(mockLoginUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: mockTokenUser.token });
    });

    it('should return status 400 when required fields are missing', async () => {
        const req = {
            body: { email: '', password: 'password123' } // Missing email
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Todos los campos son obligatorios' });
    });

    it('should return status 401 when login fails', async () => {
        mockLoginUser.mockResolvedValueOnce({ success: false, message: 'Credenciales inválidas' });
        const req = {
            body: { email: 'john.doe@example.com', password: 'wrongpassword' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
    });

    it('should return status 500 on internal server error', async () => {
        const mockError = new Error('Internal Server Error');
        mockLoginUser.mockRejectedValueOnce(mockError);
        const req = {
            body: { email: 'john.doe@example.com', password: 'password123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
});

describe('refreshToken function', () => {
    beforeEach(() => {
        jest.resetModules(); // Borra la caché de imports
        jest.clearAllMocks(); // Limpia los mocks
    });

    it('should refresh token successfully', async () => {
        const mockTokenData = { success: true, token: 'newMockToken' };
        mockRefreshTokens.mockResolvedValueOnce(mockTokenData);

        const req = {
            headers: { refresh: 'validRefreshToken' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await refreshToken(req, res);

        expect(mockRefreshTokens).toHaveBeenCalledWith(req.headers.refresh);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: mockTokenData.token });
    });

    it('should return status 401 when refresh token is not provided', async () => {
        const req = {
            headers: {}
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await refreshToken(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token de actualización no proporcionado' });
    });

    it('should return status 401 when refresh token is invalid', async () => {
        mockRefreshTokens.mockResolvedValueOnce({ success: false, message: 'Token de actualización inválido' });
        const req = {
            headers: { refresh: 'invalidRefreshToken' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await refreshToken(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token de actualización inválido' });
    });

    it('should return status 500 on internal server error', async () => {
        const mockError = new Error('Internal Server Error');
        mockRefreshTokens.mockRejectedValueOnce(mockError);
        const req = {
            headers: { refresh: 'validRefreshToken' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        await refreshToken(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
});
