const express = require('express');
const router = express.Router();
const {createUser,LoginUser,getAllUser,deleteUserByID } = require('../controller/userController');
const {addTask,updateTask,getAllTask,deleteTask,getTaskById} = require('../controller/taskController');

//router for create user
router.post('/user/create',createUser);
//router for get all user
router.get('/user',getAllUser);
// Route to login a user
router.post('/user/login',LoginUser);
//Router for add task
router.post('/task',addTask);
//router for get all tasks
router.get('/task',getAllTask);
//router for get  tasks by id
router.get('/task/:id',getTaskById);
//router for update task
router.put('/task/:id',updateTask);
//router for delete task
router.delete('/task/:id',deleteTask);
//router for delete user
router.delete('/user/:id',deleteUserByID);



module.exports = router;
