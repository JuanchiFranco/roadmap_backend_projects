import todoRepository from "../repositories/todoRepository.js";

const getAllTodos = () => todoRepository.findAll();

const getTodoById = async (id) => {
    let todo;
    try {
        todo = await todoRepository.findById(id);
    } catch {
        throw { status: 400, message: `Invalid id format: ${id}` };
    }
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

const updateTodo = async (id, fields) => {
    if (fields.title !== undefined) {
        if (typeof fields.title !== "string" || fields.title.trim() === "") {
            throw { status: 400, message: "Field 'title' must be a non-empty string" };
        }
        fields.title = fields.title.trim();
    }
    if (fields.completed !== undefined && typeof fields.completed !== "boolean") {
        throw { status: 400, message: "Field 'completed' must be a boolean" };
    }

    let todo;
    try {
        todo = await todoRepository.update(id, fields);
    } catch {
        throw { status: 400, message: `Invalid id format: ${id}` };
    }
    if (!todo) throw { status: 404, message: `Todo with id ${id} not found` };
    return todo;
};

const deleteTodo = async (id) => {
    let deleted;
    try {
        deleted = await todoRepository.remove(id);
    } catch {
        throw { status: 400, message: `Invalid id format: ${id}` };
    }
    if (!deleted) throw { status: 404, message: `Todo with id ${id} not found` };
};

export default { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };

