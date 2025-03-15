const Comment = require('../models/comment.model');
const customError = require('../utils/customError');


exports.createComment = async (req, res, next) => {
     try {

        let project_id = req.body.project_id;
        let todo_id = req.body.todo_id;
        
    if (!project_id && !todo_id) {
        throw new customError(`Either project_id or todo_id is required`, 400);
    }

    if (project_id && todo_id) {
        throw new customError(`Only one of project_id or todo_id should be set`, 400);
    }


       let comment = await Comment.createComment(req.body);
       return res.status(201).json(comment);
     }
     catch(err) {
        next(err);
     }
}
 
exports.getAllComments = async (req, res, next) => {
    try {
      let comments = await Comment.getAllComments();
      return res.status(200).json(comments);
    }
    catch(err) {
     next(err);
    }
}

exports.getCommentById = async (req, res, next) => {
    try {
       let id = req.params.id;
       if(isNaN(id)) {
        throw new customError('Invalid Comment ID. Must be a number');
       }

       let comment = await Comment.getCommentById(id);
       return res.status(200).json(comment);
    }
    catch(err) {
           next(err);
    }
}

exports.updateCommentById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) {
            throw new customError('Invalid Comment ID. Must be a number');
           }
        
         let updatedComment = await Comment.updateCommentById(id, req.body);

         return res.status(200).json(updatedComment);
    }
    catch(err) {
         next(err);
    }
}

exports.deleteCommentById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) {
            throw new customError('Invalid Comment ID. Must be a number');
           }

           let data = await Comment.deleteCommentById(id);

           return res.status(200).json(data);
    }
    catch(err) {
          next(err);
    }
}