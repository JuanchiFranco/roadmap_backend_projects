import todoRepository from "../repositories/todoRepository.js";

const getAllTodos = () => todoRepository.findAll();

const getTodoById = (id) => {
    const todo = todoRepository.findById(id);
    if (!todo) throw { status: 404, message: `Todo with id ${id} not found` };
    return todo;
};

const createTodo = (body) => {
    const { title } = body;
    if (!title || typeof title !== "string" || title.trim() === "") {
        throw { status: 400, message: "Field 'title' is required and must be a non-empty string" };
    }
    return todoRepository.create({ title: title.trim(), completed: body.completed ?? false });
};

const updateTodo = (id, fields) => {
    const existing = todoRepository.findById(id);
    if (!existing) throw { status: 404, message: `Todo with id ${id} not found` };

    const allowed = {};
    if (fields.title !== undefined) {
        if (typeof fields.title !== "string" || fields.title.trim() === "") {
            throw { status: 400, message: "Field 'title' must be a non-empty string" };
        }
        allowed.title = fields.title.trim();
    }
    if (fields.completed !== undefined) {
        if (typeof fields.completed !== "boolean") {
            throw { status: 400, message: "Field 'completed' must be a boolean" };
        }
        allowed.completed = fields.completed;
    }
    return todoRepository.update(id, allowed);
};

const deleteTodo = (id) => {
    const deleted = todoRepository.remove(id);
    if (!deleted) throw { status: 404, message: `Todo with id ${id} not found` };
};

export default { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
