export const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    if (!password) return false;
    // Requisitos mínimos: al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

export const validateUsername = (username) => {
    if (!username) return false;
    // Username debe tener entre 3 y 20 caracteres, solo letras y números
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    return usernameRegex.test(username);
};

export const validateToken = (token) => {
    if (!token || typeof token !== 'string') return false;
    // Verifica que el token tenga un formato básico de JWT
    const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    return tokenRegex.test(token);
};
