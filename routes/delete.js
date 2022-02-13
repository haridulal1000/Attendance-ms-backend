const express=require('express');
const getUser = require('../middleware/getuser');
const CheckIn = require('../models/Checkin');
const CheckOut = require('../models/CheckOut');
const app=express();
const router=express.Router();
//deleting a pair of check-in and check-out
router.delete('/delete/',getUser,async (req,res)=>{
    try {
        let success=true;
    console.log(req.body.id);
    const checkIn=await CheckIn.findById(req.body.id);
    console.log(checkIn);
    if(!checkIn){
        console.log('Not found')
        return res.status(400).json({success:false});
    }
    if(checkIn.userId.toString()!==req.user.id){
        console.log('Not found')
        return res.status(401).json({success:false});
    }
    await CheckIn.findByIdAndDelete(req.body.id);
    const checkOut=await CheckOut.findOne({year:checkIn.year,month:checkIn.month,date:checkIn.date,userId:req.user.id});
    if(checkOut){
        await CheckOut.findByIdAndDelete(checkOut._id);
        success=true;
    }
    console.log('Deleted');
   return res.json({success:true});
    } catch (error) {
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
    
   
});


module.exports=router;