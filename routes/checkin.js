const express=require('express');
const getUser = require('../middleware/getuser');
const CheckIn=require('../models/Checkin');
const Employee = require('../models/Employee');
const router=express.Router();

router.post('/',getUser,async (req,res)=>{
    try {
     let success=true;
    const newCheckIn=new CheckIn({userId:req.user.id});
    const checkIn=await CheckIn.findOne(
        {
            userId:req.user.id,
        year:newCheckIn.year,
        month:newCheckIn.month,
        date:newCheckIn.date
    });
    console.log(checkIn);
    if(checkIn!==null){
        success=false;
    }
    
    if(!success){
        return res.status(400).json({success:false,message:'Already checked In'});
    }else{
        await newCheckIn.save();
    // console.log(newCheckIn);
    const user=await Employee.findById(req.user.id);
    res.json({user:user,success:true});
    }   
    } catch (error) {
        res.status(500).json({success:false,message:'Internal Server Error',type:500}); 
    }
    

    
});
module.exports=router;