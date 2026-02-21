import todoService from "../services/todoService.js";

const getAll = (req, res, next) => {
    try {
        const todos = todoService.getAllTodos();
        res.json(todos);
    } catch (err) {
        next(err);
    }
};

const getById = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const todo = todoService.getTodoById(id);
        res.json(todo);
    } catch (err) {
        next(err);
    }
};

const create = (req, res, next) => {
    try {
        const todo = todoService.createTodo(req.body);
        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
};

const update = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const todo = todoService.updateTodo(id, req.body);
        res.json(todo);
    } catch (err) {
        next(err);
    }
};

const remove = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        todoService.deleteTodo(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export default { getAll, getById, create, update, remove };
