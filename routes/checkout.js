const express=require('express');
const getUser = require('../middleware/getuser');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const getDateObject = require('../utils/getdate');
const router=express.Router();
//adding check-outs into the database
router.post('/',getUser,async (req,res)=>{ 
    try {
        let success=true;
        const newAttendance=new Attendance({
            userId:req.user.id,
            remarks:req.body.remarks
        });
       const attendance=await Attendance.findOne(
           {
               userId:req.user.id,
               Year:newAttendance.Year,
               Month:newAttendance.Month,
               Date:newAttendance.Date
       });
       if((!attendance || !attendance.checkedIn)){
           return res.status(400).json({success:false,type:400});
       }else if(attendance.checkedOut){
        return res.status(400).json({success:false,type:400});
            }else
            {
           console.log('minute',getDateObject.getMinute());
           await Attendance.findByIdAndUpdate(attendance._id,{
               checkedOut:true,
               checkOutHour:newAttendance.checkOutHour,
               checkOutMinute:newAttendance.checkOutMinute,
               checkOutSecond:newAttendance.checkOutSecond,
               remarks:req.body.remarks?req.body.remarks:attendance.remarks
           });
           return res.json({success:true,type:200});
       }
   
    } catch (error) {
        console.log('Checkout error',error.message);
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
});
module.exports=router;