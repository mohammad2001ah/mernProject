const express = require('express');
const router = express.Router();
const {createUser,LoginUser} = require('../controller/userController');
const taskController = require('../controller/taskController');

//router for create user
router.post('/user',createUser);
// Route to login a user
router.post('/user/login',LoginUser);



module.exports = router;
