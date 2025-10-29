const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/auth');



router.post('/signup', userController.signUp);

router.post('/login', userController.login);

// router.get('/all', authMiddleware, userController.getAllUsers);

module.exports = router;
