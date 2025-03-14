const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
     try {
        let project = await Project.create(req.body);
        res.status(201).json(project);
     }
     catch(err) {
       res.status(500).json({message : err.message});
     }
}

exports.getProjectById = async (req, res) => {
    let id;
    try {
       
         id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid project ID. Must be a number." });
        }

        let project = await Project.getProjectById(id);
       return res.status(200).json(project);
    }
    catch(err) {
        if(err.message === 'not found'){
           return res.status(404).json({message : `Project with id of ${id} is not found`});
        }
        res.status(500).json({message : err.message});
    }
}

exports.getAllProjects = async (req, res) => {
     try {
     let projects = await Project.getAllProjects();
    return res.status(200).json(projects);
     }
     catch(err) {
        res.status(500).json({message : err.message});
     }
}

exports.updateProjectById = async (req, res) => {
    let id;
    try {
        
      id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid project ID. Must be a number." });
        }


       let project = await Project.updateProjectById(id, req.body);
      return res.status(200).json(project);
    }
    catch(err) {
        if(err.message === 'not found'){
           return res.status(404).json({message : `Project with id of ${id} is not found`});
        }
        res.status(400).json({message : err.message});
    }
}

exports.deleteProjectById = async (req, res) => {
      let id;
    try {
         id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid project ID. Must be a number." });
        }

        let data = await Project.deleteProjectById(id);
      return res.status(200).json(data);
    }
    catch(err) {
        if(err.message === 'not found'){
           return res.status(404).json({message : `Project with id of ${id} is not found`});
        }
        res.status(400).json({message : err.message});
    }
}