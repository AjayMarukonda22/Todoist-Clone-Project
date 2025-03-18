//const userController = require('./user.controller');
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const refreshTokenModel = require('../models/refreshToken.model');
const customError = require('../utils/customError');

exports.register = async (req, res, next) => {
    try {
        let {name, email, password} = req.body;

        let existingUser = await userModel.getUserByEmail(email);
        if(existingUser) {
            throw new customError(`Email already in use`, 400);
        }

         password = await bcrypt.hash(password, 10);

        let newUser = await userModel.createUser({name, email, password});

        return res.status(201).json(newUser);
    }
    catch(err) {
        next(err);
   
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        let user = await userModel.getUserByEmail(email);
        console.log(user);
        if(!user) {
            
            throw new customError(`Invalid email. Please enter the correct email`, 400);
         }

         let isMatch = await bcrypt.compare(password, user.password);
         if(!isMatch) {
       throw new customError(`Incorrect password. please enter the correct password`, 400);
         }

         let jwtPayload = {
             userId : user.id,
             email : user.email,
         }
   console.log(jwtPayload);
         

         const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {expiresIn : process.env.JWT_EXPIRATION_TIME});
         const refreshToken = jwt.sign(jwtPayload, process.env.JWT_REFRESH_TOKEN_KEY, {expiresIn : process.env.JWT_REFRESH_TOKEN_TIME});

         await refreshTokenModel.saveRefreshToken(user.id, refreshToken);

         return res.status(200).json({token, refreshToken});
    }
    catch(err) {
        next(err);
    }
}

exports.logout = async (req, res, next) => {
    try {
        await refreshTokenModel.deleteRefreshToken(req.userId);
        return res.status(200).json({message : `Logged out successfully`});
    }
    catch(err) {
        next(err);
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        let {refreshToken} = req.body;
        if(!refreshToken) {
            throw new customError(`No refresh token provided`, 401);
        }

        let storedToken = refreshTokenModel.getRefreshToken(req.userId);
        if(!storedToken || refreshToken !== storedToken) {
            throw new customError(`Invalid or expired refresh token`, 403);
        }

        let decoded = await jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY);

        let user = await userModel.getUserById(decoded.userId);

        let jwtPayload = {
            userId: user.id,
            email: user.email,
        };

        let newAccessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        });

            return res.status(200).json({accessToken : newAccessToken});

    }
    catch(err) {
       next(err);
    }
}