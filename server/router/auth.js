const express = require('express');
const  authMethods  = require('../controller/authController');

const router = express.Router();

router.get('/users', authMethods.getAllUsers);
router.post('/register', authMethods.registerUser);
router.post('/login', authMethods.loginUser);
router.post('/logout', authMethods.logOut);

module.exports = router;