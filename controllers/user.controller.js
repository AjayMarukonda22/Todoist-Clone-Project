const User = require('../models/user.model');
const customError = require('../utils/customError');


exports.createUser = async (req, res, next) => {
    try {
       let user = await User.createUser(req.body);

       return res.status(201).json(user);
    }
    catch(err) {
       next(err);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) {
            throw new customError('Invalid User ID. Must be a number', 400);
        }

        let user = await User.getUserById(id);
        return res.status(200).json(user);
    }
    catch(err) {
          next(err);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
         let users = await User.getAllUsers();
         return res.status(200).json(users);
    }
    catch(err) {
          next(err);
    }
}

exports.updateUserById = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) {
            throw new customError('Invalid User ID. Must be a number', 400);
        }

        let updatedUser = req.body;

        let user = await User.updateUserById(id, updatedUser);
        return res.status(200).json(user);
    }
    catch(err) {
          next(err);
    }
}

exports.deleteUserById = async ( req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) {
            throw new customError('Invalid User ID. Must be a number', 400);
        }
      
        let data = await User.deleteUserById(id);
        return res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
}