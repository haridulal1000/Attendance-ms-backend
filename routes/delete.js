const express=require('express');
const getUser = require('../middleware/getuser');
const Attendance = require('../models/Attendance');
const app=express();
const router=express.Router();
//deleting a pair of check-in and check-out
router.delete('/delete/',getUser,async (req,res)=>{
    try {
        const attendance=await Attendance.findById(req.body.id);
        if(!attendance){
            return res.status(400).json({success:false,type:400});
        }
        if(attendance.userId.toString()===req.user.id){
            await Attendance.findByIdAndDelete(attendance._id);
           return  res.json({success:true,type:200});
        } else{
            return res.status(400).json({success:false,type:401});
        }
    } catch (error) {
        console.log('Error',error.message);
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
    
   
});


module.exports=router;