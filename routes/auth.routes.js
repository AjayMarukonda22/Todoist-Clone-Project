const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticateJWt = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticateJWt, authController.logout);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;