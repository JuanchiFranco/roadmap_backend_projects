import todoService from "../services/todoService.js";

const getAll = async (req, res, next) => {
    try {
        const todos = await todoService.getAllTodos();
        res.json(todos);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const todo = await todoService.getTodoById(req.params.id);
        res.json(todo);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const todo = await todoService.createTodo(req.body);
        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const todo = await todoService.updateTodo(req.params.id, req.body);
        res.json(todo);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        await todoService.deleteTodo(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export default { getAll, getById, create, update, remove };

