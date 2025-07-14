const User =require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();  

const SECRET_KEY=process.env.SECRET_KEY;
//create user
exports.createUser=async(req,res)=>{
try {
    const{name,email,password}=req.body;
    //for encrypt  passwords
    const hashPassword= await bcrypt.hash(password,10);
    const user ={name:name,email:email,password:hashPassword};
    const newUser= new User(user);
    await newUser.save();
    res.status(201).json({
    massage:'User created successfully',
    user:newUser
});
} catch (error) {
  res.status(500).json({message:error.message});
}
}
//get all user
exports.getAllUser=async(req,res)=>{
  console.log("GET All User")
  try {
    const user= await User.find();
    res.status(200).json({
      message:'All User',
      user:user
  });
  } catch (error) {
    console.error(`Error: ${error.message}`);
      res.status(500).json({
          message:'Server error',
          error:error.message
      });
  }
}
//delete api
exports.deleteUserByID = async (req,res)=>{
  console.log("Delete user by id...");
  try {
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id)
      if(!user){
          return res.status(404).json({
              message:'User not found'
          });
      }
      res.status(200).json({
          message:'User delete successfully',
      });
      
  } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({
          message:'Server error',
          error:error.message
      });
      
  }
}
//login api
exports.LoginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({
          email:email
        });
        /*
        in this case we must make sure if email and password is correct 
        we use json web token (jwt) for if info is correct
        */
       //this line of code for user found or not
        if(!user){
          return res.status(401).json({message:"invalid email or password"});
        }
        //this line of code for compare password if it is correct or not
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
          return res.status(401).json({message:"invalid email or password"});
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '3d' });
        // after use token we send reply 
        return res.status(200).json({
          message:"Login successful",
          user:{
            name:user.name,
            email:user.email
          },
          token:token
        });
    } catch (error) {
      console.error(`Login error: ${error.message}`);
      res.status(500).json({message:error.message});
    }
}

// middleware
exports.auThMiddleware = (req,res,next)=>{
  const token = req.headers['authorization'];
  if (!token){
      return res.status(401).json({
          message:'Unauthorized'
      });
  }
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if (err){
          return res.status(401).json({
              message:"Unauthorized"
          })
      }
      req.user = decoded;
      console.log(req.user);
      next();
  })
}