const express = require('express');
const router = express.Router();
const {createUser,LoginUser} = require('../controller/userController');
const {addTask,updateTask,getAllTask,deleteTask} = require('../controller/taskController');

//router for create user
router.post('/user',createUser);
// Route to login a user
router.post('/user/login',LoginUser);
//Router for add task
router.post('/task',addTask);
//router for get all tasks
router.get('/task',getAllTask);
//router for update task
router.put('/task/:id',updateTask);
//router for delete task
router.delete('/task/:id',deleteTask);



module.exports = router;
