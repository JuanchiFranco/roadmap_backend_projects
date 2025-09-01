export const ERROR_TYPES = {
    NETWORK: 'NETWORK_ERROR',
    AUTH: 'AUTH_ERROR',
    VALIDATION: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    SERVER: 'SERVER_ERROR',
    UNKNOWN: 'UNKNOWN_ERROR'
};

export const ERROR_MESSAGES = {
    [ERROR_TYPES.NETWORK]: 'Error de conexión con el servidor',
    [ERROR_TYPES.AUTH]: 'Error de autenticación',
    [ERROR_TYPES.VALIDATION]: 'Datos inválidos',
    [ERROR_TYPES.NOT_FOUND]: 'Recurso no encontrado',
    [ERROR_TYPES.SERVER]: 'Error del servidor',
    [ERROR_TYPES.UNKNOWN]: 'Error desconocido'
};
