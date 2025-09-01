import authService from "../services/authService.js";

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const result = await authService.register(name, email, password);
            if(!result.success) return res.status(400).json({ message: result.message });

            res.status(201).json({
                message: result.message,
                data: result.data
            });
        }catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
    },
    login: async (req, res) => {
        try{
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email and password are required' });
            }

            const result = await authService.login(email, password);
            if (!result.success) return res.status(400).json({ message: result.message });

            res.status(200).json({
                message: 'Login successful',
                data: result.data
            });
        }catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    logout: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await authService.logout(userId);
            if (!result.success) return res.status(400).json({ message: result.message });
            res.status(200).json({
                message: 'Logout successful'
            });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
};

export default authController;
