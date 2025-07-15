const task = require("../models/task");
const Task =require("../models/task");
require('dotenv').config();  
// get all task
exports.getAllTask = async (req,res)=>{
  console.log("Getting all Tasks...");
  try {
      const tasks = await Task.find();
      res.status(200).json({
          message:'All Tasks',
          tasks:tasks
      });
      
  } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({
          message:'Server error',
          error:error.message
      });
      
  }
}
//get task by id
exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json({ task: task });
  } catch (error) {
    console.error("Get Task By Id Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//add task
exports.addTask=async(req,res)=>{
  try {
    const {title,description,status}=req.body;
    if(!title){
      return res.status(400).json({message:"Title is required"});
    }
    const existingTask = await Task.findOne({ title: title });
    if(existingTask){
      return res.status(400).json({ message: "Task with this title already exists" });
    }
    const task={title:title,description:description,status:status}
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      task: newTask
    });
  } catch (error) {
    console.error("Add Task Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
//Update task
exports.deleteTask=async(req,res)=>{
  try {
    const {id} =req.params;
    const deleteTask =await Task.findByIdAndDelete(id);
    if(!deleteTask){
      return res.status(404).json({message:"TASK Not Found"});
    }
    res.status(200).json({
      message: "Task Deleted successfully",
      task: deleteTask
    });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}
//Update task
exports.updateTask=async(req,res)=>{
  try {
    const {id}=req.params;
    const {title,description,status}=req.body;

    const updateTask =await Task.findByIdAndUpdate(id
      ,{title,description,status},
      {new:true}
    );
    if(!updateTask){
      return res.status(404).json({message:"TASK Not Found"});
    }
    res.status(200).json({
      message: "Task updated successfully",
      task: updateTask
    });
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}