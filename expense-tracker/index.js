/**
 * Build a simple expense tracker application to manage your finances. 
 * The application should allow users to add, delete, and view their expenses. 
 * The application should also provide a summary of the expenses.
 */

//import the required modules
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

// Define the path to the data file
const dataFilePath = path.join(__dirname, 'expenses.json');

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Function to read expenses from the data file
const readExpenses = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

// Function for listing all expenses
const listExpenses = () => {
    const expenses = readExpenses();
    if (expenses.length === 0) {
        console.log('No expenses found.');
        return;
    }
    console.log('# ID  Date       Description  Amount');
    expenses.forEach((expense, index) => {
        console.log(`#  ${index + 1}  ${new Date(expense.date).toLocaleDateString()}     ${expense.description}      $${expense.amount}`);
    });
}

// Function to get the last ID from the expenses
const getLastId = (expenses) => {
    if (expenses.length === 0) {
        return 0;
    }
    return Math.max(...expenses.map(expense => expense.id));
}

// Function for adding a new expense
const addExpense = (description, amount) => {
    const expenses = readExpenses();
    const newExpense = { 
        id: getLastId(expenses) + 1,
        description, 
        amount,
        date: new Date().toISOString()
    };
    expenses.push(newExpense);
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(expenses, null, 2), 'utf-8');
        console.log(`Expense added successfully (ID: ${newExpense.id})`);
    }catch (error) {
        console.error('Error writing to file:', error);
    }

}

// Function for deleting an expense
const deleteExpense = (id) => {
    const expenses = readExpenses();
    const index = expenses.findIndex(expense => expense.id === id);
    if (index === -1) {
        console.error(`Expense with ID ${id} not found.`);
        return;
    }
    expenses.splice(index, 1);
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(expenses, null, 2), 'utf-8');
        console.log(`Expense with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

// Function for viewing a summary of expenses
const viewSummary = (month) => {
    let expenses = readExpenses();
    if (expenses.length === 0) {
        console.log('No expenses found.');
        return;
    }
    if (month) {
        expenses = expenses.filter(expense => new Date(expense.date).getMonth() + 1 == month);
    }
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    if(month) {
        console.log(`Summary for month ${MONTHS[month - 1]}: $${total}`);
    }
    else {
        console.log(`Total expenses: $${total}`);
    }
}

// obtain the args from the command line
program
    .name('index.js')
    .description('A simple expense tracker application')
    .version('1.0.0')

program
    .command('list')
    .description('List all expenses')
    .action(() => {
        listExpenses();
    });

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('-d, --description <description>', 'Description of the expense')
    .requiredOption('-a, --amount <amount>', 'Amount of the expense')
    .action((options) => {
        const { description, amount } = options;
        if(isNaN(amount)) {
            console.error('Amount must be a number.');
            return;
        }

        if (amount <= 0) {
            console.error('Amount must be greater than 0.');
            return;
        }

        addExpense(description, parseFloat(amount));
    });

program
    .command('delete')
    .description('Delete an expense by ID')
    .requiredOption('-i, --id <id>', 'ID of the expense to delete')
    .action((options) => {
        const { id } = options;
        if (isNaN(id)) {
            console.error('ID must be a number.');
            return;
        }
        deleteExpense(parseInt(id, 10));
    });

    // Command to view a summary of expenses with the option to filter by month no obligatory
program
    .command('summary')
    .description('View a summary of expenses')
    .option('-m, --month <month>', 'Filter by month (1-12)')
    .action((options) => {
        const { month } = options;
        if (month && (isNaN(month) || month < 1 || month > 12)) {
            console.error('Month must be a number between 1 and 12.');
            return;
        }

        if (month) {
            viewSummary(month);
        }
        else {
            viewSummary(null);
        }
    });

// Parsear argumentos
program.parse(process.argv);