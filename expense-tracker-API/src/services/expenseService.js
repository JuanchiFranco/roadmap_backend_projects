import prisma from '../config/db.js';

const expenseService = {
    getExpenses: async (initDate, endDate, user) => {
        try {
            const expenses = await prisma.expense.findMany({
                where: {
                    userId: user.id,
                    date: {
                        gte: initDate,
                        lte: endDate
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });

            return {
                success: true,
                status: 200,
                data: expenses
            };
        } catch (error) {
            console.error('Error fetching expenses:', error);
            return {
                success: false,
                message: 'Error fetching expenses',
                status: 500
            };
        }
    },

    getExpenseById: async (id, userId) => {
        try {
            const expense = await prisma.expense.findUnique({
                where: {
                    id: id,
                    userId: userId
                }
            });

            if (!expense) {
                return {
                    success: false,
                    message: 'Expense not found or unauthorized',
                    status: 404
                };
            }

            return {
                success: true,
                status: 200,
                data: expense
            };
        } catch (error) {
            console.error('Error fetching expense:', error);
            return {
                success: false,
                message: 'Error fetching expense',
                status: 500
            };
        }
    },

    createExpense: async (expenseData) => {
        try {
            const expense = await prisma.expense.create({
                data: {
                    title: expenseData.title,
                    description: expenseData.description || '',
                    amount: expenseData.amount,
                    date: expenseData.date,
                    categoryId: expenseData.categoryId,
                    userId: expenseData.userId
                }
            });

            return {
                success: true,
                status: 201,
                data: expense
            };
        } catch (error) {
            console.error('Error creating expense:', error);
            return {
                success: false,
                message: 'Error creating expense',
                status: 500
            };
        }
    },

    updateExpense: async (expenseData) => {
        try {
            const existingExpense = await prisma.expense.findUnique({
                where: { id: expenseData.id }
            });

            if (!existingExpense) {
                return {
                    success: false,
                    message: 'Expense not found',
                    status: 404
                };
            }

            if (existingExpense.userId !== expenseData.userId) {
                return {
                    success: false,
                    message: 'Unauthorized to update this expense',
                    status: 403
                };
            }

            const updatedExpense = await prisma.expense.update({
                where: { id: expenseData.id },
                data: expenseData
            });

            return {
                success: true,
                status: 200,
                data: updatedExpense
            };
        } catch (error) {
            console.error('Error updating expense:', error);
            return {
                success: false,
                message: 'Error updating expense',
                status: 500
            };
        }
    },

    deleteExpense: async (id, userId) => {
        try {
            const existingExpense = await prisma.expense.findUnique({
                where: { id: id }
            });

            if (!existingExpense) {
                return {
                    success: false,
                    message: 'Expense not found',
                    status: 404
                };
            }

            if (existingExpense.userId !== userId) {
                return {
                    success: false,
                    message: 'Unauthorized to delete this expense',
                    status: 403
                };
            }

            await prisma.expense.delete({
                where: { id: id }
            });

            return {
                success: true,
                status: 200,
                message: 'Expense deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting expense:', error);
            return {
                success: false,
                message: 'Error deleting expense',
                status: 500
            };
        }
    }
}

export default expenseService;