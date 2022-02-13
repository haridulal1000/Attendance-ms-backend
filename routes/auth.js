const bcrypt = require('bcryptjs');
const express=require('express');
const router=express.Router();
const {validationResult,body}=require('express-validator');
const jwt= require('jsonwebtoken');
const getUser = require('../middleware/getuser');
const { findOne } = require('../models/Employee');
const Employee=require('../models/Employee')
require('dotenv').config();
const KEY=process.env.KEY;

//API endpoint- http://localhost:3000/api/auth/login
//login
router.post('/login',[
    body('username','username must be at least 5 characters long').isLength({min:5}),
    body('password','password must be at least 5 characters long').isLength({min:5}),
],async (req,res)=>{
   try {
        let success=false;
    const {username,password}= req.body;
    const employee=await Employee.findOne({username:username});
    if(!employee){
        return res.status(401).json({error:'Enter correct credential'});
    }
    console.log(employee.password);
    const result=await bcrypt.compare(password,employee.password);
    if(!result){
        return res.status(401).json({error:'Username and password do not match'});
    }
    const id=employee._id;
        const user={
            id:id
            };
            
        
        const authToken=jwt.sign(user,KEY);
        success=true;
        res.json({authToken,success});
   } catch (error) {
       res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
});

//API endpoint- http://localhost:5000/api/auth/signup
//signup
router.post('/signup',[
    body('username','username must be at least 5 characters long').isLength({min:5}),
    body('password','password must be at least 5 characters long').isLength({min:5})
],async (req,res)=>{
    const errors=validationResult(req);
    let success=false;
    if(!errors.isEmpty()){
        console.log('Validation Error');
        return res.status(400).json({error:errors.array()});
    }
    try{
        const employee2=await Employee.findOne({username:req.body.username});
        if(employee2){
            console.log(employee2);
           return res.status(400).json({message:'Username already exists',success:false});
        }
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,salt);
        console.log(secPassword);
        const employee=await Employee.create(
            {
                username:req.body.username,
                password:secPassword,
                name:req.body.name
            }
        );
        
        await employee.save();
        console.log('Successfully added user');
        console.log(employee.id);
        const user={
            id:employee.id
            };
            
        
        const authToken=jwt.sign(user,KEY);
        success=true;
        res.json({authToken,success});
   
    
}
catch(e){
    const message=e.message;
    console.log(message);
    res.status(500).json({message:e.message,success:false});
}});
//Ghe details of the users
//Login Required
router.get('/userdetails',getUser,async (req,res)=>{
    try {
    const employee=await Employee.findById(req.user.id).select('username password name');
    console.log(employee);
    res.send(employee);
   } catch (error) {
    res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
});
module.exports=router;