const Task = require('../models/task.model');
const customError = require('../utils/customError');

exports.createTask = async (req, res, next) => {
    try {
    let task = await Task.createTask(req.body);
    return res.status(201).json(task);
    }
    catch(err) {
     next(err);
    }
}

exports.getAllTasks = async (req, res, next) => {
   try {
      let tasks = await Task.getAllTasks();
     return res.status(200).json(tasks);
   }
   catch(err){
    next(err);
   }
}

exports.getTaskById = async (req, res, next) => {
    try {
       let id = req.params.id;

        if (isNaN(id)) {
            throw new customError("Invalid task ID. Must be a number." , 400);
        }


      let task = await Task.getTaskById(id);
     return res.status(200).json(task);
    }
    catch(err) {
        next(err);
    }
}

exports.getTasksByProjectId = async (req, res, next) => {
    try {
     let projectId = req.params.id;

        if (isNaN(projectId)) {
            throw new customError("Invalid task ID. Must be a number." , 400);
        }

        let tasks = await Task.getTasksByProjectId(projectId);
        return res.status(200).json(tasks);
    }
    catch(err) {
        next(err);
    }
}

exports.updateTaskById = async (req, res, next) => {
    try {
         let id = req.params.id;
        if(isNaN(id)) {
            throw new customError("Invalid task ID. Must be a number." , 400);
        }

        let task = await Task.updateTaskById(id, req.body);
       return res.status(200).json(task);
    }
    catch(err) {
       next(err);
    }
}

exports.deleteTaskById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) {
            throw new customError("Invalid task ID. Must be a number." , 400);
        }

        let data = await Task.deleteTaskById(id);
       return res.status(200).json(data);
    }
    catch(err) {
       next(err);
    }
}