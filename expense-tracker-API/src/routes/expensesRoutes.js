import { Router } from 'express';
import accessTokenMiddleware from '../middleware/accessTokenMiddleware.js';
import expenseController from '../controller/expenseController.js';

const router = Router();

router.use(accessTokenMiddleware);

router.get('/expenses', expenseController.getExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);

router.post('/expenses', expenseController.createExpense);
router.put('/expenses/:id', expenseController.updateExpense);

router.delete('/expenses/:id', expenseController.deleteExpense);

export default router;