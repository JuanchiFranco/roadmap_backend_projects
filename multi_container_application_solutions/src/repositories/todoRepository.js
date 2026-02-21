// In-memory store (acts as the "database" layer)
let todos = [];
let nextId = 1;

const findAll = () => todos;

const findById = (id) => todos.find((t) => t.id === id) ?? null;

const create = ({ title, completed = false }) => {
    const todo = { id: nextId++, title, completed };
    todos.push(todo);
    return todo;
};

const update = (id, fields) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;
    todos[index] = { ...todos[index], ...fields };
    return todos[index];
};

const remove = (id) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
};

export default { findAll, findById, create, update, remove };
