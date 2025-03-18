const jwt = require('jsonwebtoken');
const customError = require('../utils/customError');

const authenticateJWT  = (req, res, next) => {
    try {
        let token = req.header('Authorization')?.split(' ')[1];
        if(!token) {
            throw new customError('Access denied. No token provided.', 401);
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch(err) {
        next(err);
    }
}

module.exports = authenticateJWT;

