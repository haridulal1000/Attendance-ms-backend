const express=require('express');
const getUser = require('../middleware/getuser');
const Attendance = require('../models/Attendance');
const getDateObject = require('../utils/getdate');
const app=express();
const router=express.Router();
//updating the attributes of the check-in check-out pairs
router.put('/',getUser,async (req,res)=>{
    try{
        console.log(req.body);
        const attendance=await Attendance.findById(req.body.id);
        if(req.body.Date=== '' || req.body.Date===null){
            req.body.Date=getDateObject.getDate();
        }
        if(req.body.Month==='' || req.body.Month===null){
            req.body.Month=getDateObject.getMonth();
        }
        if(req.body.Year==='' || req.body.Year===null){
            req.body.Year=getDateObject.getYear();
        }
        if(req.body.checkInHours==='' || req.body.checkInHours===null){
            req.body.checkInHours=getDateObject.getHour();
        }
        if(req.body.checkInMinute==='' || req.body.checkInMinute===null){
            req.body.checkInMinute=getDateObject.getMinute();
        }
        if(req.body.checkInSecond==='' || req.body.checkInSecond===null){
            req.body.checkInSecond=getDateObject.getSecond();
        }
        if(req.body.checkOutHours==='' || req.body.checkOutHours===null){
            req.body.checkOutHours=getDateObject.getHour();
        }
        if(req.body.checkOutMinute==='' || req.body.checkOutMinute===null){
            req.body.checkOutMinute=getDateObject.getMinute();
        }
        if(req.body.checkOutSecond==='' || req.body.checkOutSecond===null){
            req.body.checkOutSecond=getDateObject.getSecond();
        }
        if(!attendance){
            return res.status(400).json({success:false,type:400});
        }
        if(attendance.userId.toString()===req.user.id){
            await Attendance.findByIdAndUpdate(attendance._id,{
                checkedIn:req.body.checkedIn,
                Year:req.body.Year,
                Month:req.body.Month,
                Date:req.body.Date,
                checkInHours:req.body.checkInHours,
                checkInMinute:req.body.checkInMinute,
                checkInSecond:req.body.checkInSecond,
                checkedOut:req.body.checkedOut,
                checkOutHours:req.body.checkOutHours,
                checkOutMinute:req.body.checkOutMinute,
                checkOutSecond:req.body.checkOutSecond,
            })
           return  res.json({success:true,type:200});
        } else{
            return res.status(401).json({success:false,type:401});
        }
    }catch(e){
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
   
});
module.exports=router;