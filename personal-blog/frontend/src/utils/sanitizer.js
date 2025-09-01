export const sanitizeInput = (input) => {
    if (!input) return '';
    
    // Sanitizar caracteres especiales HTML
    const sanitized = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\\/g, '&#x5C;') // Barra invertida
        .replace(/\//g, '&#x2F;')  // Barra diagonal
        .replace(/`/g, '&#x60;')
        .replace(/=/g, '&#x3D;');

    // Remover scripts y tags peligrosos
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitized, 'text/html');
    
    // Eliminar scripts y eventos
    const scripts = doc.getElementsByTagName('script');
    Array.from(scripts).forEach(script => script.remove());
    
    // Eliminar eventos
    const elements = doc.getElementsByTagName('*');
    Array.from(elements).forEach(element => {
        Object.keys(element.attributes).forEach(attr => {
            if (attr.toLowerCase().startsWith('on')) {
                element.removeAttribute(attr);
            }
        });
    });

    return doc.body.textContent || '';
};

export const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeInput(value);
        } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
};
