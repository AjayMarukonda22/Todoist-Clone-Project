const Project = require('../models/project.model');
const customError = require('../utils/customError');

exports.createProject = async (req, res, next) => {
     try {
        let project = await Project.create(req.body);
       return res.status(201).json(project);
     }
     catch(err) {
       next(err);
     }
}

exports.getProjectById = async (req, res, next) => {
    try {
       
        let id = req.params.id;

        if (isNaN(id)) {
            throw new customError("Invalid project ID. Must be a number.", 400);
        }

        let project = await Project.getProjectById(id);
       return res.status(200).json(project);
    }
    catch(err) {

        next(err);

    }
}

exports.getAllProjects = async (req, res, next) => {
     try {
     let projects = await Project.getAllProjects();
    return res.status(200).json(projects);
     }
     catch(err) {
       next(err);
     }
}

exports.getProjectsByUserId = async (req, res, next) => {
    try {
         let user_id = req.params.id;
         
         if (isNaN(user_id)) {
            throw new customError("Invalid User ID. Must be a number.", 400);
        }

        let projects = await Project.getProjectsByUserId(user_id);
        return res.status(200).json(projects);

    }
    catch(err) {
        next(err);
    }
}

exports.updateProjectById = async (req, res, next) => {
    try {
        
      let id = req.params.id;

        if (isNaN(id)) {
            throw new customError("Invalid project ID. Must be a number.", 400);
        }


       let project = await Project.updateProjectById(id, req.body);
      return res.status(200).json(project);
    }
    catch(err) {
        next(err);
    }
}

exports.updateIsFavoriteById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if (isNaN(id)) {
            throw new customError("Invalid project ID. Must be a number.", 400);
        }

        let is_favorite = req.body.is_favorite;
        console.log(is_favorite);

        if(typeof is_favorite !== 'boolean') {
            throw new customError('Invalid value for is_favorite. Must be boolean', 400);
        }

        let updatedProject = await Project.updateIsFavoriteById(id, is_favorite);
        return res.status(200).json(updatedProject);
    }
    catch(err) {
        next(err);
    }
}

exports.deleteProjectById = async (req, res, next) => {
    try {
       let id = req.params.id;

        if (isNaN(id)) {
            throw new customError("Invalid project ID. Must be a number.", 400)
        }

        let data = await Project.deleteProjectById(id);
      return res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
}