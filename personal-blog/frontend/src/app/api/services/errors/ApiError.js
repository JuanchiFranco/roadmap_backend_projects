class ApiError extends Error {
    constructor(type, message, details) {
        super(message);
        this.type = type;
        this.details = details || {};
    }
}

export default ApiError;
