const express = require('express');
const  authMethods  = require('../controller/authController');

const router = express.Router();

router.get('/users', authMethods.getAllUsers);
router.post('/register', authMethods.registerUser);
router.post('/login', authMethods.loginUser);
router.get('/logout', authMethods.logOut);
router.post('/password/forgot',authMethods.forgotPassword);
router.post('/password/reset/:token',authMethods.resetPassword);

module.exports = router;