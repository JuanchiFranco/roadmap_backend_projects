import Todo from "../models/todoModel.js";

const findAll = () => Todo.find().lean();

const findById = (id) => Todo.findById(id).lean();

const create = (fields) => Todo.create(fields);

const update = (id, fields) =>
    Todo.findByIdAndUpdate(id, fields, { new: true, runValidators: true }).lean();

const remove = (id) => Todo.findByIdAndDelete(id).lean();

export default { findAll, findById, create, update, remove };
