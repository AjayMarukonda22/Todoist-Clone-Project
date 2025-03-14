const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
    try {
    let task = await Task.createTask(req.body);
    return res.status(201).json(task);
    }
    catch(err) {
     res.status(500).json({message : err.message});
    }
}

exports.getAllTasks = async (req, res) => {
   try {
      let tasks = await Task.getAllTasks();
     return res.status(200).json(tasks);
   }
   catch(err){
    res.status(500).json({message : err.message});
   }
}

exports.getTaskById = async (req, res) => {
     let id;
    try {
         id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid task ID. Must be a number." });
        }


      let task = await Task.getTaskById(id);
     return res.status(200).json(task);
    }
    catch(err) {
        if(err.message === 'not found'){
          return res.status(404).json({message : `Task with id of ${id} is not found`});
        }
        res.status(500).json({message : err.message});
    }
}

exports.getTasksByProjectId = async (req, res) => {
    let projectId;
    try {
     projectId = req.params.id;

        if (isNaN(projectId)) {
            return res.status(400).json({ error: "Invalid project ID. Must be a number." });
        }

        let tasks = await Task.getTasksByProjectId(projectId);
        return res.status(200).json(tasks);
    }
    catch(err) {
        if(err.message === 'not found'){
          return res.status(404).json({message : `Project with id of ${projectId} doesn't have any tasks`});
        }
        res.status(500).json({message : err.message});
    }
}

exports.updateTaskById = async (req, res) => {
    let id;
    try {
         id = req.params.id;
        if(isNaN(id)) {
            return res.status(400).json({error : "Invalid task ID. Must be a number." });
        }

        let task = await Task.updateTaskById(id, req.body);
       return res.status(200).json(task);
    }
    catch(err) {
        if(err.message === 'not found'){
           return res.status(404).json({message : `Task with id of ${id} is not found`});
        }
        res.status(500).json({message : err.message});
    }
}

exports.deleteTaskById = async (req, res) => {
    let id;
    try {
         id = req.params.id;
        if(isNaN(id)) {
            return res.status(400).json({error : "Invalid task ID. Must be a number." });
        }

        let data = await Task.deleteTaskById(id);
       return res.status(200).json(data);
    }
    catch(err) {
        if(err.message === 'not found'){
          return  res.status(404).json({message : `Task with id of ${id} is not found`});
        }
        res.status(500).json({message : err.message});
    }
}