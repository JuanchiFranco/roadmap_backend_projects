import expenseService from '../services/expenseService.js';

const expenseController = {

    getExpenses: async (req, res) => {
        try {
            const { user } = req;
            const { initDate = new Date(0), endDate = new Date() } = req.query;
            const initDateParsed = new Date(initDate);
            const endDateParsed = new Date(endDate);

            if (isNaN(initDateParsed) || isNaN(endDateParsed)) {
                return res.status(400).json({ message: 'Invalid date format' });
            }

            if (initDateParsed > endDateParsed) {
                return res.status(400).json({ message: 'Start date must be before end date' });
            }

            const result = await expenseService.getExpenses(initDateParsed, endDateParsed, user);
            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }
            res.status(result.status).json({ message: 'Expenses fetched successfully', data: result.data });
        } catch (error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({ message: 'Error fetching expenses'});
        }
    },

    getExpenseById: async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const result = await expenseService.getExpenseById(parseInt(id), user.id);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(200).json({ message: 'Expense fetched successfully', data: result.data });
        } catch (error) {
            console.error('Error fetching expense:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createExpense: async (req, res) => {
        try {
            const { user } = req;
            const { title, description, amount, date, categoryId } = req.body;

            if (!title || !amount || !date) {
                return res.status(400).json({ message: 'title, amount and date are required' });
            }

            if (isNaN(amount) || amount <= 0) {
                return res.status(400).json({ message: 'Amount must be a positive number' });
            }

            const dateParsed = new Date(date);
            if (isNaN(dateParsed)) {
                return res.status(400).json({ message: 'Invalid date format' });
            }

            if (categoryId && isNaN(categoryId)) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }

            const expenseData = {
                title,
                description: description || '',
                amount: parseFloat(amount),
                date: dateParsed,
                categoryId: categoryId ? parseInt(categoryId) : null,
                userId: user.id
            };

            const result = await expenseService.createExpense(expenseData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(201).json({ message: 'Expense created successfully', data: result.data });
        } catch (error) {
            console.error('Error creating expense:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateExpense: async (req, res) => {
        try{
            const { user } = req;
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
            const { title, description, amount, date, categoryId } = req.body;

            if (!title || !amount || !date) {
                return res.status(400).json({ message: 'title, amount and date are required' });
            }

            if (isNaN(amount) || amount <= 0) {
                return res.status(400).json({ message: 'Amount must be a positive number' });
            }

            const dateParsed = new Date(date);
            if (isNaN(dateParsed)) {
                return res.status(400).json({ message: 'Invalid date format' });
            }

            if (categoryId && isNaN(categoryId)) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }

            const expenseData = {
                id: parseInt(id),
                title,
                description: description || '',
                amount: parseFloat(amount),
                date: dateParsed,
                categoryId: categoryId ? parseInt(categoryId) : null,
                userId: user.id
            };

            const result = await expenseService.updateExpense(expenseData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(200).json({ message: 'Expense updated successfully', data: result.data });

        }catch (error) {
            console.error('Error updating expense:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteExpense: async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const result = await expenseService.deleteExpense(parseInt(id), user.id);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default expenseController;