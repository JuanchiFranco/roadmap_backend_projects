const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
process.loadEnvFile();

const filePath = path.join(__dirname, '../data/users.json');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(hashedPassword, password) {
    return await bcrypt.compare(password, hashedPassword);
}

async function getAllUsers() {
    let users = [];
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(data);
        }

        return users || []; // Ensure we return an array
    } catch (error) {
        console.error('Error reading users:', error);
        throw new Error('Internal server error');
    }
}

const authService = {
    async register(username, email, password) {
        let users = await getAllUsers();

        // Check if user already exists
        if (users.some(user => user.email === email)) {
            throw new Error('El email ya está en uso, por favor intenta con otro');
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        // Add new user with hashed password
        const newUser = {
            id: users.length + 1, // Simple ID generation
            username: username || 'Usuario', // Default username if not provided
            email: email,
            password: hashedPassword,
            role: 'public', // Default role
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        users.push(newUser);

        // Write updated users back to file
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        // generamos un token de acceso para el usuario con jsonwebtoken
        const token = jwt.sign({ id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, {
            algorithm: 'HS256', // Algoritmo de firma
            expiresIn: '1h' // Token expiration time
        });

        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            token // Return the generated token
        }
    },

    async login(email, password) {
        let users = await getAllUsers();

        // Find user by email
        const user = users.find(user => user.email === email);

        if (!user) {
            throw new Error('Credenciales incorrectas, verifica tu email y contraseña');
        }

        // Compare encrypted password
        const match = await verifyPassword(user.password, password);
        if (!match) {
            throw new Error('Credenciales incorrectas, verifica tu email y contraseña');
        }

        // Generate access token for the user
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h' // Token expiration time
        });

        // Return user data without password
        return {
            id: user.id,
            username: user.username || 'Usuario', // Default username if not set
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token // Return the generated token
        };
    }
}

module.exports = authService;