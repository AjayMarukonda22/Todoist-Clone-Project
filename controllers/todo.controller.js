const Todo = require('../models/todo.model');
const customError = require('../utils/customError');

exports.createTodo = async (req, res, next) => {
    try {
        let todo = await Todo.createTodo(req.body);
        return res.status(201).json(todo);
    }
    catch (err) {
        next(err);
    }
}

exports.getAllTodos = async (req, res, next) => {
    try {
        let filters = req.query;
        let todos = await Todo.getAllTodos(filters);
        return res.status(200).json(todos);
    }
    catch (err) {
        next(err);
    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        let id = req.params.id;

        if (isNaN(id)) {
            throw new customError("Invalid todo ID. Must be a number.", 400);
        }

        let todo = await Todo.getTodoById(id);
        return res.status(200).json(todo);
    }
    catch (err) {
        next(err);
    }
}

exports.getTodosByProjectId = async (req, res, next) => {
    try {
        let projectId = req.params.id;

        if (isNaN(projectId)) {
            throw new customError("Invalid project ID. Must be a number.", 400);
        }

        let todos = await Todo.getTodosByProjectId(projectId);
        return res.status(200).json(todos);
    }
    catch (err) {
        next(err);
    }
}

exports.updateTodoById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if (isNaN(id)) {
            throw new customError("Invalid todo ID. Must be a number.", 400);
        }

        let todo = await Todo.updateTodoById(id, req.body);
        return res.status(200).json(todo);
    }
    catch (err) {
        next(err);
    }
}

exports.deleteTodoById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if (isNaN(id)) {
            throw new customError("Invalid todo ID. Must be a number.", 400);
        }

        let data = await Todo.deleteTodoById(id);
        return res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}
